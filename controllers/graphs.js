const productService = require("../services/graphs");

async function showGraphsPage(req, res) {
    res.render('../views/graphs');
}

async function getGenresGraph(req, res) {
    genresData = await productService.genresGraph();
    if(genresData){
        res.status(200).send(genresData);
    } else{
        res.status(400).send("fail");
    }
}

async function getPricesGraph(req, res) {
    pricesData = await productService.pricesGraph();
    if(pricesData){
        res.status(200).send(pricesData);
    } else{
        res.status(400).send("fail");
    } 
}



module.exports = {
    showGraphsPage,
    getGenresGraph,
    getPricesGraph
}