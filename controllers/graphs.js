const productService = require("../services/graphs");

async function showGraphs(req, res) {
    productService.GenresGraph();
    res.render('../views/graphs');
}

module.exports = {
    showGraphs
}