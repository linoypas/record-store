async function showHomePage(req, res) {
    const username = req.session.username || 'Guest';
    const isAdmin = req.session.isAdmin || false;
    res.render('../views/homePage',{username,isAdmin});
}

module.exports = {
    showHomePage
}