const StoreLocation = require('../models/storeLocation');

exports.getAllStoreLocations = async (req, res) => {
    try {
        const storeLocations = await StoreLocation.find();
        res.json(storeLocations);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.addStoreLocation = async (req, res) => {
    const { name, address, latitude, longitude } = req.body;

    const storeLocation = new StoreLocation({
        name,
        address,
        latitude,
        longitude
    });

    try {
        const savedStoreLocation = await storeLocation.save();
        res.status(201).json(savedStoreLocation);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
