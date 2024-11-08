const userService = require("../services/users");

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
    const user = await userService.getUser(req.params.id);
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
    try{
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
}