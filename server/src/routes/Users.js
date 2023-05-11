const express = require('express');
const user = require('../controllers/Users')

const router = express.Router();

router.post('/register', user.registerUser);

router.post('/login', user.loginUser);

module.exports = router;    