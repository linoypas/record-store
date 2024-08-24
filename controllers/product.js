const procductModel = require("../models/Product");
const productService = require("../services/product");

function form(req, res) {
    productService.getAllProducts().then(results => {
        res.render('../views/product', {products:results});
    })
}
module.exports = {
    form
}