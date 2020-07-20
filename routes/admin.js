const express = require("express");
const router = express.Router();

const admin_controller = require("../controllers/admin_controller");

const passport = require("../config/passport");

router.get("/register", admin_controller.registrationPage);

router.get("/schedule", function (req, res) {
  if (req.user) {
    res.render("admin/schedule", { user: req.user });
  } else {
    res.redirect("/admin/login");
  }
});

router.get("/logout", admin_controller.signOutUser);

router.get("/login", admin_controller.login);

router.get("/schedule/events", admin_controller.schedulejson);

router.post("/register", admin_controller.register);

router.post("/schedule", admin_controller.sendEmail);

router.post(
  "/login",
  passport.authenticate("local", { failureRedirect: "/login" }),
  function (req, res) {
    res.redirect("/");
  }
),
  admin_controller.login;

module.exports = router;
