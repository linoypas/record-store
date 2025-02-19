const mongoose = require('mongoose');

const storeLocationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true }
});

const StoreLocation = mongoose.model('StoreLocation', storeLocationSchema, 'storeLocation');

module.exports = StoreLocation;
