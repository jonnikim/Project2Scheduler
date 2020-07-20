const db = require('../models');
let newestEvent = {};

//Todo Can't seem to get this part to function correctly where it joins the Event database onto the EventTime database when using a Where statement to filter by the date of the event (I removed the where clause to make this work)
exports.newevent = function (req, res) {
	db.EventTimes.findAll({
		include: [db.Event],
	}).then(function (dbEvent) {
		console.log(dbEvent);

		res.render('client/newevent', { eventinfo: dbEvent });
	});
};

/*
exports.newevent = function (req, res) {
	db.EventTimes.findAll().then(function (dbEventTimes) {
		console.log(dbEventTimes);
		res.render('client/newevent', { eventinfo: dbEventTimes });
	});
};

*/

//* Controller to send informatin to the confirmation page rather than using an ID number in the URL Params which could be a security issue
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

//* Controller to render the new event confirm page
exports.neweventconfirm = function (req, res) {
	res.render('client/neweventconfirm', newestEvent);
};
