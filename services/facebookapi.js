require('dotenv').config();
const fetch = require('node-fetch');

const FB_PAGE_ID = process.env.FB_PAGE_ID;
const FB_PAGE_ACCESS = process.env.FB_PAGE_ACCESS;
const FB_GRAPH_URL = `https://graph.facebook.com/v21.0/${FB_PAGE_ID}/feed`;

const postProductToFacebook = async (product) => {
    console.log('Attempting to post product to Facebook...');
    console.log('Product:', product);
    console.log('Page Access Token:', FB_PAGE_ACCESS);

    try {
        console.log(`Sending request to Facebook Graph API: ${FB_GRAPH_URL}`);
        
        // Construct the message payload
        const message = `Check out our new product: ${product.name} by ${product.artist}. Genre: ${product.genre}. Price: $${product.price}.`;
        
        // If product.image contains a URL, use it in the request
        const requestBody = {
            message: message,
            access_token: FB_PAGE_ACCESS
        };
        
        if (product.image && typeof product.image === 'string') {
            requestBody.link = product.image; // Ensure image is a URL
        }

        console.log('Request parameters:', requestBody);

        // Send the request to Facebook API
        const response = await fetch(FB_GRAPH_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams(requestBody)
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(`Error posting to Facebook: ${data.error.message}`);
        }

        console.log('Post successful:', data);
        return data;
    } catch (error) {
        console.error('Error posting product to Facebook:', error.message);
        throw new Error('Error posting product to Facebook: ' + error.message);
    }
};

module.exports = {
    postProductToFacebook
};