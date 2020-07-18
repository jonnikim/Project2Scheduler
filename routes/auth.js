const express = require("express");
const router = express.Router();
const auth_controller = require("../controllers/auth_controller");
const passport = require("passport");
const qs = require("qs");
const MS_GRAPH_SCOPE = "https://graph.microsoft.com/.default";
require("dotenv").config();
const app = express();

// router.get("/signin", auth_controller.signin);
// router.get("/callback", auth_controller.callback);
// router.get("/signout", auth_controller.signout);
router.get("/signin", function (req, res, next) {
  passport.authenticate("azuread-openidconnect", {
    response: res,
    prompt: "login",
    failureRedirect: "/",
    failureFlash: true,
    successRedirect: "/",
  })(req, res, next);
});

router.post("/callback", function (req, res, next) {
  console.log("Okay");

  passport.authenticate("azuread-openidconnect", {
    response: res,
    failureRedirect: "/",
    failureFlash: true,
    successRedirect: "/",
  })(req, res, next);
  console.log("Me");
});

router.get("/signout", function (req, res) {
  req.session.destroy(function (err) {
    req.logout();
    res.redirect("/");
  });
});
module.exports = router;
