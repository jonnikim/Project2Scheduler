module.exports = function (app) {
	const application = require('./routes/application');
	const admin = require('./routes/admin');
	const client = require('./routes/client');

	app.use('/', application);
	app.use('/admin', admin);
	app.use('/client', client);
};
