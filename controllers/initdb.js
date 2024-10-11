const productService = require("../services/product");
const Product = require("../models/product");
const fs = require('fs');
const path = require('path');

async function updateProductCollection(req,res){


    try{
        await Product.deleteMany({})

        let imagePath = path.join(__dirname, '../database/images/harrys_house-harry_styles.jpg');
        await productService.createProduct("Pop",2022,"Harry Styles","Harry's House",120,"תכניסו כאן תיאור",{buffer: fs.readFileSync(imagePath),mimetype: path.extname(imagePath).slice(1)},true);
    
        imagePath = path.join(__dirname, '../database/images/fine_line-harry_styles.webp');
        await productService.createProduct("Pop",2019,"Harry Styles","Fine Line",110,"תכניסו כאן תיאור",{buffer: fs.readFileSync(imagePath),mimetype: path.extname(imagePath).slice(1)},true);
        
        imagePath = path.join(__dirname, '../database/images/Taylor_Swift_-_1989_.png');
        await productService.createProduct("Pop",2014,"Taylor Swift","1989",150,"תכניסו כאן תיאור",{buffer: fs.readFileSync(imagePath),mimetype: path.extname(imagePath).slice(1)},false);
    
        imagePath = path.join(__dirname, '../database/images/Coldplay_-_Parachutes.png');
        await productService.createProduct("Pop",2000,"Coldplay","Parachutes",180,"תכניסו כאן תיאור",{buffer: fs.readFileSync(imagePath),mimetype: path.extname(imagePath).slice(1)},true);
    
        imagePath = path.join(__dirname, '../database/images/Short_n_Sweet_-_Sabrina_Carpenter.png');
        await productService.createProduct("Pop",2024,"Sabrina Carpenter","Short N’ Sweet",120,"תכניסו כאן תיאור",{buffer: fs.readFileSync(imagePath),mimetype: path.extname(imagePath).slice(1)},true);
        
        imagePath = path.join(__dirname, '../database/images/Post-Malone-Twelve-Carat-Toothache.webp');
        await productService.createProduct("Hip Hop",2022,"Post Malone","Twelve Carat Toothache",80,"תכניסו כאן תיאור",{buffer: fs.readFileSync(imagePath),mimetype: path.extname(imagePath).slice(1)},true);
        
        imagePath = path.join(__dirname, '../database/images/Drake-Honestly-Nevermind.webp');
        await productService.createProduct("Hip Hop",2023,"Drake","Honestly, Nevermind",110,"תכניסו כאן תיאור",{buffer: fs.readFileSync(imagePath),mimetype: path.extname(imagePath).slice(1)},false);
        
        imagePath = path.join(__dirname, '../database/images/scorpion-drake.jpg');
        await productService.createProduct("Hip Hop",2018,"Drake","Scorpion",130,"תכניסו כאן תיאור",{buffer: fs.readFileSync(imagePath),mimetype: path.extname(imagePath).slice(1)},true);
        
        imagePath = path.join(__dirname, '../database/images/Train_–_Greatest_Hits.png');
        await productService.createProduct("Rock",2018,"Train","Greatest Hits",130,"תכניסו כאן תיאור",{buffer: fs.readFileSync(imagePath),mimetype: path.extname(imagePath).slice(1)},true);
        
        imagePath = path.join(__dirname, '../database/images/one-more-time-blink182.jpg');
        await productService.createProduct("Rock",2023,"Blink 182","One More Time... part 2",130,"תכניסו כאן תיאור",{buffer: fs.readFileSync(imagePath),mimetype: path.extname(imagePath).slice(1)},true);
        
        imagePath = path.join(__dirname, '../database/images/shalom-hanoch-mehakim-lamechiah.jpg');
        await productService.createProduct("ישראליים",1985 ,"שלום חנוך","מחכים למשיח",135,"תכניסו כאן תיאור",{buffer: fs.readFileSync(imagePath),mimetype: path.extname(imagePath).slice(1)},true);
        
        imagePath = path.join(__dirname, '../database/images/caveret-zafuf-baozen.jpg');
        await productService.createProduct("ישראליים",1975 ,"כוורת","צפוף באוזן",105,"תכניסו כאן תיאור",{buffer: fs.readFileSync(imagePath),mimetype: path.extname(imagePath).slice(1)},false);
        
        imagePath = path.join(__dirname, '../database/images/Kaveret_Sipori.jpg');
        await productService.createProduct("ישראליים",1973 ,"כוורת","סיפורי פוגי",90,"תכניסו כאן תיאור",{buffer: fs.readFileSync(imagePath),mimetype: path.extname(imagePath).slice(1)},true);

        const username = req.session.username || 'Guest';
        const isAdmin = req.session.isAdmin || false;
        res.status(200).render('../views/homepage',{username,isAdmin});
    } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


module.exports = {
    updateProductCollection
}