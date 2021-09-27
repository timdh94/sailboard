const router = require('express').Router();
const LoginController = require('./controllers/loginController');
const userController = require('./controllers/userController');
const collectionController = require('./controllers/collectionController');
const listingController = require('./controllers/listingController');
const bidController = require('./controllers/bidController');
const authMiddleware = require('./middleware/jwtAuth');

const multer = require('multer');
const upload = multer({ dest: 'images/uploads'});

router.post('/login', LoginController.authenticate);

router.post('/user', userController.createAccount);
router.get('/user', authMiddleware, userController.getUserById);

router.get('/collection', authMiddleware, collectionController.getUserCollection);
router.post('/collection', authMiddleware, upload.single('image'), collectionController.addKeyboardToCollection);
router.delete('/collection/:id', authMiddleware, collectionController.deleteKeyboard);

router.post('/listing', authMiddleware, listingController.createListing);
router.get('/listing/userListings', authMiddleware, listingController.getUserListings);
router.get('/listing', listingController.getAllListings);
router.get('/listing/:id', listingController.getListingById);

router.post('/bid', authMiddleware, bidController.placeBid);
router.get('/bid/:listingId', authMiddleware, bidController.getListingBids);
router.get('/user/bids', authMiddleware, bidController.getUserBids);
router.patch('/bid/reject', authMiddleware, bidController.rejectBid)
router.delete('/bid/:id', authMiddleware, () => {});

module.exports = router;