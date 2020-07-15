require('dotenv').config();
const graph = require('./graph');
const authRouter = require('./routes/auth');
const app = require('express');
const passport = require('passport');
const OIDCStrategy = require('passport-azure-ad').OIDCStrategy;

// Configure passport

// In-memory storage of logged-in users
// For demo purposes only, production apps should store
// this in a reliable storage
const users = {};

// Passport calls serializeUser and deserializeUser to
// manage users
passport.serializeUser(function(user, done) {
  // Use the OID property of the user as a key
  users[user.profile.oid] = user;
  done (null, user.profile.oid);
});

passport.deserializeUser(function(id, done) {
  done(null, users[id]);
});
// Configure simple-oauth2
const oauth2 = require('simple-oauth2').create({
    client: {
      id: process.env.OAUTH_APP_ID,
      secret: process.env.OAUTH_APP_PASSWORD
    },
    auth: {
      tokenHost: process.env.OAUTH_AUTHORITY,
      authorizePath: process.env.OAUTH_AUTHORIZE_ENDPOINT,
      tokenPath: process.env.OAUTH_TOKEN_ENDPOINT
    }
  });

// Callback function called once the sign-in is complete
// and an access token has been obtained
async function signInComplete(iss, sub, profile, accessToken, refreshToken, params, done) {
    if (!profile.oid) {
      return done(new Error("No OID found in user profile."));
    }
  
    try{
      const user = await graph.getUserDetails(accessToken);
  
      if (user) {
        // Add properties to profile
        profile['email'] = user.mail ? user.mail : user.userPrincipalName;
      }
    } catch (err) {
      return done(err);
    }
  
    // Create a simple-oauth2 token from raw tokens
    let oauthToken = oauth2.accessToken.create(params);
  
    // Save the profile and tokens in user storage
    users[profile.oid] = { profile, oauthToken };
    return done(null, users[profile.oid]);
  }

// Configure OIDC strategy
passport.use(new OIDCStrategy(
  {
    identityMetadata: `${process.env.OAUTH_AUTHORITY}${process.env.OAUTH_ID_METADATA}`,
    clientID: process.env.OAUTH_APP_ID,
    responseType: 'code id_token',
    responseMode: 'form_post',
    redirectUrl: process.env.OAUTH_REDIRECT_URI,
    allowHttpForRedirectUrl: true,
    clientSecret: process.env.OAUTH_APP_PASSWORD,
    validateIssuer: false,
    passReqToCallback: false,
    scope: process.env.OAUTH_SCOPES.split(' ')
  },
  signInComplete
));

const indexRouter = require('./routes/index');

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next) {
    // Set the authenticated user in the
    // template locals
    if (req.user) {
      res.locals.user = req.user.profile;
    }
    next();
  });

app.use('/', indexRouter);
app.use('/auth', authRouter);
