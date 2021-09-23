const db = require('../models/index');

const getUserCollection = async (req, res) => {
  try {
    if (!req.userId) {
      res.status(403).send({
        message: 'Invalid credentials'
      });
      return;
    }
    
    const id = req.userId;
    
    const userCollection = await db.Keyboard.findAll({
      where: {
        UserId: id
      }
    });
    
    res.status(200).send({
      message: 'Collection retrieved',
      userCollection
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: 'Error retrieving collection'
    });
  }
};

const addKeyboardToCollection = async (req, res) => {
  try {
    const id = req.userId;
    if (!id) {
      res.status(403).send({
        message: 'Invalid credentials'
      });
      return;
    }
    
    // TODO: validate data
    
    const board = req.body;
    board.UserId = id;
    
    const addedBoard = await db.Keyboard.create(board);
    
    if (res) {
      res.status(200).send({
        message: 'Keyboard added to collection',
        board: addedBoard
      });
    }

  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: 'Error adding keyboard to collection'
    });
  }
}


module.exports = {
  getUserCollection,
  addKeyboardToCollection,
};
