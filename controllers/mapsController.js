const storeLocationController= require('./storeLocationController');

exports.getMaps = async (req, res) => {
    try {
        const username = req.session.username || 'Guest';
        const isAdmin = req.session.isAdmin || false;

        console.log("Fetching store locations...");
        const storeLocations = await storeLocationController.getAllStoreLocations();  // Use service to fetch data

        res.render('maps', { 
            storeLocations,
            username,
            isAdmin
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
