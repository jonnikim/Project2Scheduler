const db = require('../models');

//register user
exports.register = function (req, res) {
	db.User.findAll({
		where: {email: req.body.email}
	  }).then(function(users) {
		if (users.length > 0) {
		  res.json({
			duplicateUser: true
		  });
		//At some point, make sure that only one user can be associated with an email.
		} else {
		  db.User.create({
			first_name: req.body.first_name,
			last_name: req.body.last_name,
			email: req.body.email,
			password: req.body.password
		  }).then(function() {
			  console.log("Admin_controler");
			res.render({redirect: '/admin/login'}); //Redirects to the Login.
		  }).catch(function(err) {
			res.json(err);
		  });
		}
	  })  
};
exports.registrationPage = function(req,res) {
	res.render('admin/register'); //*Fill in what to render
  };
exports.login = function (req, res) {
	// Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
    // So we're sending the user back the route to the members page because the redirect will happen on the front end
    // They won't get this or even be able to access this page if they aren't authed

	res.render('admin/login'); //*Fill in what to render
};
exports.signOutUser = function(req,res) {
	req.logOut();
	res.redirect("/admin/login");
  };
exports.schedule = function (req, res) {
	res.render('admin/schedule'); //*Fill in what to render
};
