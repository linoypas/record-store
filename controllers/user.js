const { rawListeners } = require("../models/product");
const userService = require("../services/users");
const orderService = require("../services/orders");

async function showProfile(req, res) {
    const username = req.session.username || 'Guest';
    const isAdmin = req.session.isAdmin || false;

    if (username === 'Guest') {
        return res.redirect('/login'); // Redirect to login if the user is not logged in
    }

    // Fetch the orders for the logged-in user
    try {
        const orders = await orderService.getOrdersByUsername(username); // Using the new function
        const ordersList = orders.map(order => ({
            _id: order._id,
            orderDate: order.orderDate,
            totalAmount: order.totalAmount,
            items: order.items,
        }));

        res.render('profile', {
            username,
            isAdmin,
            orders: ordersList,
        });
    } catch (error) {
        console.error("Error fetching user orders:", error);
        res.status(500).send("An error occurred while fetching your orders.");
    }
}

async function showUsers(req, res) {
    const username = req.session.username || 'Guest';
    const isAdmin = req.session.isAdmin || false;
    const users = await userService.getUsers();
     const usersList = users.map(users =>({
        _id: users._id,
        username: users.username,
        password: users.password,
        address: users.address,
        phonenumber: users.phonenumber,
        isAdmin: users.isAdmin
      }));
    if(isAdmin){
        if(!users){
            return res.status(404).json({errors: ['not found']})
        }
        res.render('../views/users', {users:usersList, username,isAdmin});
    }
    else
        res.status(403).render('../views/error', { message: "PERMISSION DENIED" ,isAdmin,username});
}
async function getUser(req,res){

}

async function updateUser(req,res) {
    const user = await userService.updateUser(
        req.params.id,
        req.body.username,
        req.body.password,
        req.body.phonenumber,
        req.body.address,
        req.body.isAdmin);
        
    if(!user){
        console.log('fail: update user')
        res.status(500).send("חלה שגיאה בעת עדכון היוזר");
    }
    console.log('done: update user');
    res.json(user);
}

async function addUserPage(req, res) {
    const username = req.session.username || 'Guest';
    const isAdmin = req.session.isAdmin || false;
    if(isAdmin)
        try {
            res.render('../views/addUser.ejs', {username,isAdmin});
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    else
        res.status(403).render('../views/error', { message: "PERMISSION DENIED" ,isAdmin,username});
}

async function createUser(req, res) {
    const { username, password, phonenumber, address, isAdmin } = req.body
    const result = await userService.createUser(username, password, phonenumber, address, isAdmin)
    if (result != null) {
      res.redirect('/users');
    }
    else{
      res.redirect('/users');
    }
  }
async function deleteUser(req,res){
    try{
        if (req.params.id === req.session._id){
            req.session.destroy();   
        }
        const user = await userService.deleteUser(req.params.id);
        console.log('done: delete user')
        res.status(200).send('היוזר נמחק בהצלחה');

    } catch(err){
        console.log('fail: delete user')
        res.status(500).send("חלה שגיאה בעת מחיקת היוזר");
    }
       
}

module.exports = {
    getUser,
    deleteUser,
    updateUser,
    showUsers,
    createUser,
    addUserPage,
    showProfile
}