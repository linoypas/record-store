const productService = require("../services/graphs");

async function showGraphsPage(req, res) {
    const username = req.session.username || 'Guest';
    const isAdmin = req.session.isAdmin || false;
    if(isAdmin)
      res.render('../views/graphs',{username,isAdmin});
    else
      res.status(403).render('../views/error', { message: "PERMISSION DENIED" ,isAdmin,username});

}

async function getGenresGraph(req, res) {
  const username = req.session.username || 'Guest';
  const isAdmin = req.session.isAdmin || false;
  if(isAdmin){
    try {
          const genresData = await productService.genresGraph();
          res.status(200).send(genresData);
        } catch (error) {
          res.status(500).json({ message: error.message });
        }
      }
  else
  res.status(403).render('../views/error', { message: "PERMISSION DENIED" ,isAdmin,username});
}

async function getPricesGraph(req, res) {
  const username = req.session.username || 'Guest';
  const isAdmin = req.session.isAdmin || false;
  if(isAdmin){
    try {
        const pricesData = await productService.pricesGraph();
        res.status(200).send(pricesData);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    }
  else
    res.status(403).render('../views/error', { message: "PERMISSION DENIED" ,isAdmin,username});

}

module.exports = {
    showGraphsPage,
    getGenresGraph,
    getPricesGraph
}