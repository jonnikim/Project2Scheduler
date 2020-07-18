const db = require('../models');
let newestEvent = {};
/*
exports.newevent = function (req, res) {
	db.Event.findAll({
		where: {
			UserId: req.event.testdateind,
		},
	}).then(function (dbEvent) {
		console.log(dbEvent);
		res.render('client/newevent', {
			layout: 'main',
			times: dbEvent,
		});
	});
}; 
*/

exports.newevent = function (req, res) {
	res.render('client/newevent');
};

exports.neweventadd = function (req, res) {
	db.Event.create(req.body)
		.then(function () {
			newestEvent = req.body;
			res.redirect('/client/neweventconfirm');
			//*Sent Confirmation Email Function Here
		})
		.catch(function (err) {
			res.json(err);
		});
};

exports.neweventconfirm = function (req, res) {
	res.render('client/neweventconfirm', newestEvent);
};
