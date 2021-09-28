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
      include: [
        { model: db.Listing }
      ],
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
    const image = req.file;
    // TODO: add imagePath (image.path) to keyboard data model
    if (!id) {
      res.status(403).send({
        message: 'Invalid credentials'
      });
      return;
    }
    
    const board = req.body;
    console.log(board);
    board.UserId = id;
    
    const addedBoard = await db.Keyboard.create({
      ...board,
      image: image.filename
    });
    
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
};

// TODO: ensure keyboard being deleted belongs to the authenticated user
const deleteKeyboard = async (req, res) => {
  try {
    const UserId = req.userId;
    const id = req.params.id;
    if (!UserId || !id) {
      res.status(403).send({
        message: 'Invalid credentials'
      });
    }
    await db.Keyboard.destroy({
      where: {
        id,
        UserId
      }
    });
    
    res.status(200).send({
      message: 'Keyboard deleted'
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: 'Error deleting keyboard'
    });
  }
}


module.exports = {
  getUserCollection,
  addKeyboardToCollection,
  deleteKeyboard,
};
