const express = require('express');
const router = express.Router();

const admin_controller = require('../controllers/admin_controller');

router.get('/register', admin_controller.register);

router.get('/login', admin_controller.login);

router.get('/schedule', admin_controller.schedule);

router.get('/schedule/events', admin_controller.schedulejson);

module.exports = router;
