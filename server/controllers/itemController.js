const { uploadOnCloudinary } = require('../config/cloudinary.js');
const Item = require('../models/itemModel.js');

module.exports.createItem = async (req, res, next) => {
    // console.log("req.file", req.file);
  try {
    const { name, description, category, price, rating, hearts } = req.body;

    let imageUrl = '';

    // Upload image to Cloudinary if file exists
    if (req.file && req.file.path) {
      const cloudinaryResponse = await uploadOnCloudinary(req.file.path);
      imageUrl = cloudinaryResponse.secure_url;
    }

    // Calculate total (example: total = price * rating)
    const total = Number(price) * 1; // You can change logic as needed

    // Create new item
    const newItem = new Item({
      name,
      description,
      category,
      price,
      rating,
      hearts,
      total,
      imageUrl,
    });

    await newItem.save();

    res.status(201).json({
      success: true,
      message: 'Item created successfully!',
      data: newItem,
    });
  } catch (error) {
    console.error('Error creating item:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create item',
      error: error.message,
    });
  }
}

// GET FUNCTION TO GET ALL ITEMS
module.exports.getItems = async (req, res, next) => {
  try {
    const items = await Item.find().sort({ createdAt: -1 });

    res.status(200).json(items);
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch items',
      error: error.message,
    });
  }
};

// DELETE FUNCTION TO DELETE ITEMS
module.exports.deleteItem = async (req, res, next) => {
  try {
    const removed = await Item.findByIdAndDelete(req.params.id);
    if (!removed) {
      return res.status(404).json({ success: false, message: 'Item not found' });
    }
    res.status(204).end();
  } catch (error) {
    console.error('Error deleting item:', error);
    next(error);
  }
};