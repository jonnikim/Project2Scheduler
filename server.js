//Dependencies
require("dotenv").config();
const graph = require("./controllers/mail_controller");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const OIDCStrategy = require("passport-azure-ad").OIDCStrategy;
const express = require("express");
const exphbs = require("express-handlebars");
const app = express();
const path = require("path");
const axios = require("axios");
const qs = require("qs");
//const db = require('./models');

let users = {};

// Passport calls serializeUser and deserializeUser to
// manage users
passport.serializeUser(function (user, done) {
  // Use the OID property of the user as a key
  users[user.profile.oid] = user;
  done(null, user.profile.oid);
});

passport.deserializeUser(function (id, done) {
  done(null, users[id]);
});
const oauth2 = require("simple-oauth2").create({
  client: {
    id: process.env.OAUTH_APP_ID,
    secret: process.env.OAUTH_APP_PASSWORD,
  },
  auth: {
    tokenHost: process.env.OAUTH_AUTHORITY,
    authorizePath: process.env.OAUTH_AUTHORIZE_ENDPOINT,
    tokenPath: process.env.OAUTH_TOKEN_ENDPOINT,
  },
});

////////////////////////////////////////////
// Office 365 API for organization purposes
////////////////////////////////////////////
async function signInComplete(
  iss,
  sub,
  profile,
  accessToken,
  refreshToken,
  params,
  done
) {
  if (!profile.oid) {
    return done(new Error("No OID found in user profile."));
  }

  try {
    const user = await graph.getUserDetails(accessToken);
    console.log(user);
    const mail = await graph.sendMail(accessToken);
    if (user) {
      // Add properties to profile
      profile["email"] = user.mail ? user.mail : user.userPrincipalName;
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
passport.use(
  new OIDCStrategy(
    {
      identityMetadata: `${process.env.OAUTH_AUTHORITY}${process.env.OAUTH_ID_METADATA}`,
      clientID: process.env.OAUTH_APP_ID,
      responseType: "code id_token",
      responseMode: "form_post",
      redirectUrl: process.env.OAUTH_REDIRECT_URI,
      allowHttpForRedirectUrl: true,
      clientSecret: process.env.OAUTH_APP_PASSWORD,
      validateIssuer: false,
      passReqToCallback: false,
      scope: process.env.OAUTH_SCOPES.split(" "),
    }
    // signInComplete
  )
);
require("./routes")(app);

app.use(
  session({
    secret: process.env.OAUTH_APP_PASSWORD,
    resave: false,
    saveUninitialized: false,
    unset: "destroy",
  })
);

app.use(function (req, res, next) {
  next();
});

app.set("views", path.join(__dirname, "views"));

//Handlebar Views Setup
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use(require("serve-static")(__dirname + "/../../public"));
app.use(require("cookie-parser")());
app.use(require("body-parser").urlencoded({ extended: true }));
app.use(
  require("express-session")({
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
require("./routes")(app);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  // Set the authenticated user in the
  // template locals
  if (req.user) {
    res.locals.user = req.user.profile;
  }
  next();
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next();
});

app.use(function (err, req, res, next) {});

// async function sending(accessToken) {
//   try {
//     console.log("SENT?");
//     const mail = await graph.sendMail(accessToken);
//   } catch (err) {
//     return console.log(err);
//   }
// }
// const postData = {
//   client_id: process.env.OAUTH_APP_ID,
//   scope: "https://graph.microsoft.com/.default",
//   client_secret: process.env.OAUTH_APP_PASSWORD,
//   grant_type: "client_credentials",
// };

// axios.defaults.headers.post["Content-Type"] =
//   "application/x-www-form-urlencoded";
// let token = "";
// axios
//   .post(
//     "https://login.microsoftonline.com/47f5c791-6089-4043-8131-a3ad81b5224f/oauth2/v2.0/token",
//     qs.stringify(postData)
//   )
//   .then((response) => {
//     console.log(response.data.access_token);
//     sending(response.data.access_token);
//   })
//   .catch((error) => {
//     console.log(error);
//   });

module.exports = app;
