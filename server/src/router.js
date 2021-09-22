const router = require('express').Router();
const LoginController = require('./controllers/loginController');
const userController = require('./controllers/userController');

router.post('/login', LoginController.authenticate);
router.post('/users', userController.createAccount);

module.exports = router;