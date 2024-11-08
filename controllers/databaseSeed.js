const mongoose = require('mongoose');
const productService = require("../services/product");
const userService = require("../services/users");
const Product = require("../models/product");
const User = require("../models/User");
const fs = require('fs');
const path = require('path');

// Connect to MongoDB
const MONGO_URI = 'mongodb://127.0.0.1:27017/recordsStore';
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

async function updateProductCollection() {
    try {
        await Product.deleteMany({});

        // Define products with image paths
        const products = [
            { genre: "Pop", year: 2022, artist: "Harry Styles", title: "Harry's House", price: 120, description: "תכניסו כאן תיאור", image: 'harrys_house-harry_styles.jpg', isAvailable: true },
            { genre: "Pop", year: 2019, artist: "Harry Styles", title: "Fine Line", price: 110, description: "תכניסו כאן תיאור", image: 'fine_line-harry_styles.webp', isAvailable: true },
            { genre: "Pop", year: 2014, artist: "Taylor Swift", title: "1989", price: 150, description: "תכניסו כאן תיאור", image: 'Taylor_Swift_-_1989_.png', isAvailable: false },
            { genre: "Pop", year: 2000, artist: "Coldplay", title: "Parachutes", price: 180, description: "תכניסו כאן תיאור", image: 'Coldplay_-_Parachutes.png', isAvailable: true },
            { genre: "Pop", year: 2024, artist: "Sabrina Carpenter", title: "Short N’ Sweet", price: 120, description: "תכניסו כאן תיאור", image: 'Short_n_Sweet_-_Sabrina_Carpenter.png', isAvailable: true },
            { genre: "Hip Hop", year: 2022, artist: "Post Malone", title: "Twelve Carat Toothache", price: 80, description: "תכניסו כאן תיאור", image: 'Post-Malone-Twelve-Carat-Toothache.webp', isAvailable: true },
            { genre: "Hip Hop", year: 2023, artist: "Drake", title: "Honestly, Nevermind", price: 110, description: "תכניסו כאן תיאור", image: 'Drake-Honestly-Nevermind.webp', isAvailable: false },
            { genre: "Hip Hop", year: 2018, artist: "Drake", title: "Scorpion", price: 130, description: "תכניסו כאן תיאור", image: 'scorpion-drake.jpg', isAvailable: true },
            { genre: "Rock", year: 2018, artist: "Train", title: "Greatest Hits", price: 130, description: "תכניסו כאן תיאור", image: 'Train_–_Greatest_Hits.png', isAvailable: true },
            { genre: "Rock", year: 2023, artist: "Blink 182", title: "One More Time... part 2", price: 130, description: "תכניסו כאן תיאור", image: 'one-more-time-blink182.jpg', isAvailable: true },
            { genre: "ישראליים", year: 1985, artist: "שלום חנוך", title: "מחכים למשיח", price: 135, description: "תכניסו כאן תיאור", image: 'shalom-hanoch-mehakim-lamechiah.jpg', isAvailable: true },
            { genre: "ישראליים", year: 1975, artist: "כוורת", title: "צפוף באוזן", price: 105, description: "תכניסו כאן תיאור", image: 'caveret-zafuf-baozen.jpg', isAvailable: false },
            { genre: "ישראליים", year: 1973, artist: "כוורת", title: "סיפורי פוגי", price: 90, description: "תכניסו כאן תיאור", image: 'Kaveret_Sipori.jpg', isAvailable: true },
        ];

        for (const product of products) {
            const imagePath = path.join(__dirname, '../database/images', product.image);
            const image = {
                buffer: fs.readFileSync(imagePath),
                mimetype: path.extname(imagePath).slice(1)
            };
            await productService.createProduct(product.genre, product.year, product.artist, product.title, product.price, product.description, image, product.isAvailable);
        }

        console.log("Product collection updated successfully.");
    } catch (error) {
        console.error("Error updating product collection:", error);
    }
}

async function updateUsersCollection() {
    try {
        await User.deleteMany({});
        await userService.createUser("Admin", "Aa12345678", "0000000000", "none", true);
        console.log("User collection updated successfully.");
    } catch (error) {
        console.error("Error updating user collection:", error);
    }
}

async function seedDatabase() {
    try {
        await updateProductCollection();
        await updateUsersCollection();
    } finally {
        mongoose.connection.close();
    }
}

seedDatabase();