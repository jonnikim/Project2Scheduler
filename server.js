const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');

// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 8080;

// Requiring our models for syncing
// const db = require('./models');

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Session middleware
// NOTE: Uses default in-memory session store, which is not
// suitable for production
app.use(session({
	secret: 'BHrtlmy3X-1.JY9z-Dd8V7.YA0Ad7~R32l',
	resave: false,
	saveUninitialized: false,
	unset: 'destroy'
  }));

// Syncing our sequelize models and then starting our express app
// db.sequelize.sync({ force: true }).then(() => {
	app.listen(PORT, () => {
		console.log('App listening on PORT ' + PORT);
	});
// });

