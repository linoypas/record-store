function gethomepage(req, res) {
    // try {const username = req.session.username ;}
    // catch{const username = 'guest';}    
    res.render('../views/homePage',{});
}

module.exports = {
    gethomepage,
}