function gethomepage(req, res) {
    res.render('../views/homePage',{});
}

module.exports = {
    gethomepage,
}