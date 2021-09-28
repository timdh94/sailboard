const db = require('../models/index');

const placeBid = async (req, res) => {
  // validate data
  // CHECK IF USER HAS ACTIVE BID ON LISTING!!!

  try {
    const userId = req.userId;
    const reqBid = req.body;
    if (!userId) {
      res.status(403).send({
        message: 'Not authenticated'
      });
      return;
    }
    const bidder = await db.User.findOne({
      where: {
        id: userId
      }
    });
    if (!bidder) {
      res.status(403).send({
        message: 'Error validating user credentials'
      });
      return;
    }

    const listing = reqBid.listing;
    if (reqBid.bid <= 0 || reqBid.bid <= listing.minBid) {
      res.status(400).send({
        message: 'Bid must be greater than the listing\'s minimum bid.'
      });
      return;
    }
  
    const newBid = {
      status: 'Pending response',
      amount: reqBid.bid,
      message: reqBid.message,
      bidderLocation: bidder.country,
      ListingId: reqBid.listing.id,
      SellerId: listing.UserId,
      UserId: userId,
    };
    
    const placedBid = await db.Bid.create(newBid);
    
    res.status(200).send({
      message: 'Bid placed',
      placedBid
  });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: 'Error placing bid, try again later'
    });
  }
};

const getListingBids = async (req, res) => {
  const userId = req.userId;
  if (!userId) {
    res.status(403).send({
      message: 'Not authenticated'
    });
    return;
  }
  
  const listingId = req.params.listingId;
  const listing = await db.Listing.findOne({
    where: {
      id: listingId
    }
  });
  
  if (listing.UserId !== userId) {
    res.status(403).send({
      message: 'Not authenticated to view these bids'
    });
    return;
  }
  
  const bids = await db.Bid.findAll({
    where: {
      ListingId: listingId
    }
  });
  
  res.status(200).send({
    message: 'test',
    bids
  });
};

const rejectBid = async (req, res) => {
  // auth user
  // get bid they are rejecting
  // confirm they own the listing?
  // change bid status to rejected ---> store these in a separate database? is it worth it?
  const userId = req.userId;
  if (!userId) {
    res.status(403).send({ message: 'Invalid credentials' });
    return;
  }
  const bid = req.body;
  
  await db.Bid.update(
    { status: 'Rejected' },
    { where: {
      id: bid.id
    }}
  );
  
  res.status(200).send({
    message: 'Bid rejected'
  });
};

const acceptBid = async (req, res) => {
  const userId = req.userId;
  if (!userId) {
    res.status(403).send({ message: 'Invalid credentials' });
    return;
  }
  const bid = req.body;
  
  const bidWithListing = await db.Bid.findOne({
    include: [{
      model: db.Listing
    }] ,
    where: {
      id: bid.id
    }
  });
  
  // update keyboard UserId to be bidder Id
  await db.Keyboard.update(
    { UserId: bid.UserId },
    { where: {
      id: bidWithListing.Listing.KeyboardId
    }}
  );
  
  await db.Listing.destroy({ 
    where: {
      id: bidWithListing.Listing.id
    }
  });
  
  const winner = await db.User.findOne({
    where: { id: bid.UserId }
  });

  const soldListing = {
    soldPrice: bid.amount,
    BidderId: bid.UserId,
    UserId: bid.SellerId,
    winnerUserName: winner.userName,
    winnerEmail: winner.email,
    KeyboardId: bidWithListing.Listing.KeyboardId
  };
  await db.SoldListing.create(soldListing);
  
  res.status(200).send({
    message: 'Bid accepted!',
    soldListing
  });
};

const getUserBids = async (req, res) => {
  const userId = req.userId
  const userBids = await db.Bid.findAll({
    where: {
      UserId: userId
    }
  });
  res.status(200).send({
    message: 'Bids retrieved',
    userBids
  });
};

module.exports = {
  placeBid,
  getListingBids,
  rejectBid,
  getUserBids,
  acceptBid,
};