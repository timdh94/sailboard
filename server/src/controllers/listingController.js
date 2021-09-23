const db = require('../models/index');
const { use } = require('../router');

const getAllListings = async (req, res) => {
  try {
    const allListings = await db.Listing.findAll({
      include: {
        model: db.Keyboard
      }
    });
    
    res.status(200).send({
      message: 'Listings retreived',
      listings: allListings
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: 'Error retrieving listings'
    });
  }
};

const createListing = async (req, res) => {
  try {
    if (!req.userId) {
      res.status(403).send({
        message: 'Invalid credentials'
      });
      return;
    }
    
    const user = await db.User.findOne({
      where: {
        id: req.userId
      }
    });
    if (!user) {
      console.log('no user found with that id')
      return;
    }
    const newListing = req.body;
    if (!newListing.boardId) {
      res.status(500).send({
        message: 'invalid board'
      });
    }
    
    // CHECK IF LISTINGS EXISTS
    const listingExists = await db.Listing.findOne({
      where: {
        KeyboardId: newListing.boardId
      }
    });
    
    if (listingExists) {
      res.status(400).send({
        message: 'Listing for that keyboard already exists'
      });
      return;
    }

    const createdListing = await db.Listing.create({
      buyItNowPrice: newListing.buyItNowPrice,
      sellerName: user.userName,
      itemLocation: user.country,
      UserId: user.id,
      KeyboardId: newListing.boardId
    });
    
    res.status(200).send({
      message: 'Listing created',
      newListing: createdListing
    });

  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: 'Error creating listing'
    });
  }
};

module.exports = {
  getAllListings,
  createListing
};