const router = require('express').Router();
const LoginController = require('./controllers/loginController');
const userController = require('./controllers/userController');
const collectionController = require('./controllers/collectionController');
const authMiddleware = require('./middleware/jwtAuth');

router.post('/login', LoginController.authenticate);

router.post('/users', userController.createAccount);
router.get('/users', authMiddleware, userController.getUserById);

router.get('/collection', authMiddleware, collectionController.getUserCollection);
router.post('/collection', authMiddleware, collectionController.addKeyboardToCollection);

module.exports = router;