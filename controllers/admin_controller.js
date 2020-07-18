const db = require('../models');

exports.register = function (req, res) {
	res.render('admin/register'); //*Fill in what to render
};

exports.login = function (req, res) {
	res.render('admin/login'); //*Fill in what to render
};

exports.schedule = function (req, res) {
	res.render('admin/schedule');
};

exports.schedulejson = function (req, res) {
	db.Event.findAll({}).then(function (dbEvent) {
		// We have access to the todos as an argument inside of the callback function

		res.json(dbEvent);
	});
	//res.render('admin/schedule'); //*Fill in what to render
};
