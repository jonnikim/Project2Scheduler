const express = require('express');
const router = express.Router();

const client_controller = require('../controllers/client_controller');

router.get('/newevent', client_controller.newevent);

router.get('/neweventconfirm', client_controller.neweventconfirm);

module.exports = router;
