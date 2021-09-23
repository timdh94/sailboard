const router = require('express').Router();
const LoginController = require('./controllers/loginController');
const userController = require('./controllers/userController');
const collectionController = require('./controllers/collectionController');
const listingController = require('./controllers/listingController');
const authMiddleware = require('./middleware/jwtAuth');

router.post('/login', LoginController.authenticate);

router.post('/users', userController.createAccount);
router.get('/users', authMiddleware, userController.getUserById);

router.get('/collection', authMiddleware, collectionController.getUserCollection);
router.post('/collection', authMiddleware, collectionController.addKeyboardToCollection);
router.delete('/collection/:id', authMiddleware, collectionController.deleteKeyboard);

router.post('/listings', authMiddleware, listingController.createListing);

module.exports = router;