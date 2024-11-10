const StoreLocation = require('../models/storeLocation');

exports.getAllStoreLocations = async (req, res) => {
    try {
        const storeLocations = await StoreLocation.find();
        const isAdmin = req.session.isAdmin || false;
        const username = req.session.username || 'Guest'; 

        res.render('storeLocation', {
            storeLocations: storeLocations,
            isAdmin: isAdmin,
            username: username
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.addStoreLocation = async (req, res) => {
    const { name, address, latitude, longitude } = req.body;
    const isAdmin = req.session.isAdmin || false;
    const username = req.session.username || 'Guest'; 
    const storeLocation = new StoreLocation({
        name,
        address,
        latitude,
        longitude
    });

    try {
        const savedStoreLocation = await storeLocation.save();
        res.render('storeLocation', {
            storeLocations: await StoreLocation.find(),
            isAdmin: isAdmin,
            username: username,
            message:'Store location created successfully!'
        });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
