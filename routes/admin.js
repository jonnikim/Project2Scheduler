const express = require('express');
const router = express.Router();

const admin_controller = require('../controllers/admin_controller');
const passport = require("../config/passport");
// const isAuthenticated = require("../config/middleware/isAuthenticated");

router.get('/register', admin_controller.registrationPage);

router.get('/schedule', admin_controller.schedule);


router.get('/logout', admin_controller.signOutUser);

router.get('/login',  admin_controller.login);


router.post('/register',  admin_controller.register);

router.post('/login', passport.authenticate("local", { failureRedirect: '/login' }),
function(req, res) {
  res.redirect('/');
}), admin_controller.login;

router.get('/schedule/events', admin_controller.schedulejson);


module.exports = router;
