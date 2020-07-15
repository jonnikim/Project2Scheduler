const db = require('../models');

exports.register = function (req, res) {
	res.render('admin/register'); //*Fill in what to render
};

exports.login = function (req, res) {
	res.render('admin/login'); //*Fill in what to render
};

exports.schedule = function (req, res) {
	res.render('admin/schedule'); //*Fill in what to render
};
