//Dependencies
const express = require('express');
const exphbs = require('express-handlebars');
const app = express();
const path = require('path');
//const db = require('./models');

app.set('views', path.join(__dirname, 'views'));

//Handlebar Views Setup
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

require('./routes')(app);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	const err = new Error('Not Found');
	err.status = 404;
	next(err);
});

app.use(function (err, req, res, next) {
	res.status(err.status || 500);
	res.render('error', {
		message: err.message,
		error: app.get('env') === 'development' ? err : {},
	});
});

module.exports = app;
