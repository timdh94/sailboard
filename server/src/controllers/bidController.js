const db = require('../models/index');

const placeBid = async (req, res) => {
  // retrieve listing and ensure that min bid is correct
  // validate data

  const userId = req.userId;
  if (!userId) {
    res.status(403).send({
      message: 'Not authenticated'
    });
    return;
  }
  
  const reqBid = req.body;
  
  if (reqBid.bid <= 0) {
    res.status(400).send({
      message: 'Bid must be greater than or equal to $0'
    });
  }
  const newBid = {
    status: 'Pending response',
    amount: reqBid.bid,
    message: reqBid.message,
    ListingId: reqBid.listingId,
    UserId: userId,
  };
  
  console.log(newBid);
  
  const placedBid = await db.Bid.create(newBid);
  console.log(placedBid);
  
  res.status(200).send({
    message: 'Bid placed',
    placedBid
  });
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

module.exports = {
  placeBid,
  getListingBids,
};