const userService = require("../services/user");

function checkParams(req){
}

async function listUsers(req, res) {
    const users = await userService.getUsers(checkParams(req));
    if(!users){
        return res.status(404).json({errors: ['not found']})
    }
    res.json(users);
}

async function getUser(req,res){
    const user = await userService.getUser(req.params.id);
    if(!user) {
        return res.status(404).json({errors: ['not found']})
    }
    res.json(user);
}
async function searchUser(req,res){
    if(req.body.username == null || req.body.password == null) {
        res.status(400).send("חלק מהשדות ריקים, נסה שוב")

    } else {
        const user = await userService.searchUser(
            req.body.username,
            req.body.password);
            if(user){
                console.log('done: login succesed')
                res.status(200).send('ההזדהות הושלמה ');
            }  
            else {
                console.log('fail: user or password not correct')
                res.status(500).send("חלה שגיאה בעת הזדהות היוזר");
            } 
        }
    }

async function addUser(req,res) {
    if(req.body.username == null || req.body.password == null || req.body.phonenumber == null || req.body.address == null) {
            res.status(400).send("חלק מהשדות ריקים, נסה שוב")

        } else{
            const user = await userService.createUser(
                req.body.username,
                req.body.password);
            
            if(user){
                console.log('done: create user')
                res.status(200).send('היוזר התווסף בהצלחה');
            }  
            else {
                console.log('fail: create product')
                res.status(500).send("חלה שגיאה בעת יצירת המוצר");
            }      
        }

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
    addUser,
    deleteUser,
    updateUser,
    listUsers,
    searchUser
}