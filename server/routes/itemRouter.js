const express = require('express');
const multer = require('multer');
const { createItem, getItems, deleteItem } = require('../controllers/itemController.js');

const itemRouter = express.Router();

// TYPE HERE MULTER FUNCTION TO STORE IMAGE

const storage = multer.diskStorage({
    destination: (req, res, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
})

const upload = multer({ storage });

itemRouter.post('/', upload.single('image'), createItem);
itemRouter.get('/', getItems);
itemRouter.delete('/:id', deleteItem);

module.exports = itemRouter