const db = require('../models');

exports.newevent = function (req, res) {
	res.render('client/newevent');
};

exports.neweventconfirm = function (req, res) {
	res.render('client/neweventconfirm');
};
