const router = require('express').Router();
const LoginController = require('./controllers/loginController');
const userController = require('./controllers/userController');
const authMiddleware = require('./middleware/jwtAuth');

router.post('/login', LoginController.authenticate);
router.post('/users', userController.createAccount);
// TODO: AUTH MIDDLEWARE HERE
router.get('/users/', authMiddleware, userController.getUserById);

module.exports = router;