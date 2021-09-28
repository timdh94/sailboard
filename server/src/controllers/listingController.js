const db = require('../models/index');
const { Op } = require('sequelize');

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

const getUserListings = async (req, res) => {
  try {
    const userId = req.userId;
    if (!userId) {
      res.status(403).send({
        message: 'Invalid credentials'
      });
      return;
    }
    
    const userListings = await db.Listing.findAll({
      include: [
        { model: db.Keyboard }, 
        { model: db.Bid },
      ],
      where: {
        UserId: userId 
      }
    });

    res.status(200).send({
      message: 'User listings retreived',
      userListings
    });

  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: 'Error retrieving user\'s listings' 
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
      // TODO: error res here
      console.log('no user found with that id')
      return;
    }
    const newListing = req.body;
    if (!newListing.boardId) {
      res.status(500).send({
        message: 'invalid board'
      });
    }
    
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
      minBid: newListing.minBid,
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

const getListingById = async (req, res) => {
  const id = req.params.id;
  if (!id) res.status(403).send({ message: 'Invalid credentials' });
  
  const listing = await db.Listing.findOne({
    include: [{
      model: db.Keyboard 
    }],
    where: {
      id
    }
  });
  
  res.status(200).send({
    message: 'Listing retrieved',
    listing
  });
};

const getUserHistory = async (req, res) => {
  const userId = req.userId;
  const listingHistory = await db.SoldListing.findAll({
    include: [
      { model: db.Keyboard },
    ],
    where: {
      [Op.or]: [
        { BidderId: userId },
        { UserId: userId }
      ]
    }
  });
  
  res.status(200).send({
    message: 'History retrieved',
    listingHistory
  });
}

module.exports = {
  getAllListings,
  createListing,
  getUserListings,
  getListingById,
  getUserHistory,
};