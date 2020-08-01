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
const logger = require("morgan");
const flash = require("connect-flash");
const path = require("path");
const authRouter = require("./routes/auth");
const admin = require("./routes/admin");

app.use(require("body-parser").urlencoded({ extended: true }));

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
    },
    signInComplete
  )
);

app.use(
  session({
    secret: process.env.OAUTH_APP_PASSWORD,
    resave: false,
    saveUninitialized: false,
    unset: "destroy",
  })
);
require("./routes")(app);

app.use(flash());
app.use(function (req, res, next) {
  res.locals.error = req.flash("error_msg");

  // Check for simple error string and
  // convert to layout's expected format
  let errs = req.flash("error");
  for (let i in errs) {
    res.locals.error.push({ message: "An error occurred", debug: errs[i] });
  }

  next();
});

app.set("views", path.join(__dirname, "views"));

//Handlebar Views Setup
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Sets up the Express app to handle data parsing
app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use(require("serve-static")(__dirname + "/../../public"));
app.use(cookieParser());

app.use(passport.initialize());
app.use(passport.session());

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  // Set the authenticated user in the
  // template locals
  if (req.user) {
    res.locals.user = req.user.profile;
  }
  next();
});
app.use("/auth", authRouter);
app.use("/admin", admin);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next();
});

app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  console.log(err.message, err.status);
});

module.exports = app;
