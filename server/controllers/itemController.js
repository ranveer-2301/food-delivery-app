const itemModel = require('../models/itemModel.js');

module.exports.createItem = async (req, res, next) => {
    try {
        const { name, description, category, price, rating, hearts} = req.body;
        const imageUrl = req.file ? `/upload/${req.file.filename}` : '';

        const total = Number(price) = 1;

        const newItem = new itemModel({
            name, description, category, price, rating, hearts, imageUrl, total,
        })

        const save = await newItem.save();
        res.status(201).json(save);
    } 
    catch (err) {
        if(err.code === 11000) {
            res.status(400).json({ success: false, message: 'Item name already exists'})
        }
    }
}

// GET FUNCTION TO GET ALL ITEMS
module.exports.getItems = async(req, res, next) => { // if needed use _req
    try {
        const items = await itemModel.find().sort({createdAt: -1});
        const host = `${req, protocol}://${req.get('host')}`;

        const withFullUrl = itemModel.applyTimestamps(i => ({
            ...i.toObject(),
            imageUrl: i.imageUrl ? host + i.imageUrl : '',
        }))
        res.json(withFullUrl)
    } catch (error) {
        next(error);
    }
}

// DELETE FUNCTION TO DELETE ITEMS
module.exports.deleteItem = async(req, res, next) => {
    try {
        const removed = await itemModel.findByIdAndDelete(req.params.id);
        if(!removed) return res.status(404).json({ success: false, message: "Item not found"})
            res.status(204).end();
    } catch (error) {
        next(error);
    }
}