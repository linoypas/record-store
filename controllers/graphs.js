const productService = require("../services/graphs");

async function showGraphsPage(req, res) {
    res.render('../views/graphs');
}

async function getGenresGraph(req, res) {
    try {
        const genresData = await productService.genresGraph();
        res.status(200).send(genresData);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
}

async function getPricesGraph(req, res) {
    try {
        const pricesData = await productService.pricesGraph();
        res.status(200).send(pricesData);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }

}

module.exports = {
    showGraphsPage,
    getGenresGraph,
    getPricesGraph
}