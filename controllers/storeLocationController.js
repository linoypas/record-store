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

exports.deleteStoreLocation = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedLocation = await StoreLocation.findByIdAndDelete(id);
        
        if (!deletedLocation) {
            return res.status(404).json({ message: 'Store location not found' });
        }
        
        res.status(200).json({ message: 'Store location deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};