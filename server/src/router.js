const router = require('express').Router();
const LoginController = require('./controllers/loginController');

router.post('/login', LoginController.authenticate);

module.exports = router;