// const passport = require("passport");

// exports.signin = function (req, res, next) {
//   console.log("Hi guys");

//   passport.authenticate("azuread-openidconnect", {
//     response: res,
//     prompt: "login",
//     failureRedirect: "/",
//     failureFlash: true,
//     successRedirect: "/",
//   })(req, res, next);
// };

// exports.callback = function (req, res, next) {
//   passport.authenticate("azuread-openidconnect", {
//     response: res,
//     failureRedirect: "/",
//     failureFlash: true,
//     successRedirect: "/",
//   })(req, res, next);
// };
// exports.signout = function (req, res, next) {
//   req.session.destroy(function (err) {
//     req.logout();
//     res.redirect("/");
//   });
// };
