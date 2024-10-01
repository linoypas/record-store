const userService = require("../services/user");

async function listUsers(req, res) {
    const users = await userService.getUsers();
    if(!users){
        return res.status(404).json({errors: ['not found']})
    }
    res.json(users);
}
async function getUser(req,res){
    const user = await userService.getUser(req.params.username);
    if(!user) {
        return res.status(404).json({errors: ['not found']})
    }
    res.json(user);
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

async function deleteUser(req,res){
    const user = await userService.deleteProduct(req.params.id);
    if(user){
        console.log('done: delete product')
        res.status(200).send('היוזר נמחק בהצלחה');
    } else{
        console.log('fail: delete product')
        res.status(500).send("חלה שגיאה בעת מחיקת היוזר");
    }
       
}

module.exports = {
    getUser,
    deleteUser,
    updateUser,
    listUsers,
}