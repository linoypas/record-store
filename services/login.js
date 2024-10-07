const User = require("../models/User");
const bcrypt = require("bcrypt");
const alert = require("alert");



async function login(username, password) {
    if(!username|| !password){
        alert("Please insert username and password")
        console.log("Please insert username and password")
        return null
    }
    const user = await User.findOne({username: username});
    if (user) {
        const isValid = await bcrypt.compare(password, user.password)

        if (!isValid) {
          alert('Incorrect user or password')
          console.log("Incorrect user or password")
            return null
        }
    }
    else{
        alert("Incorrect user or password")
        console.log("Incorrect user or password")
        return null
    }
    return user != null
}

async function register(username, password, phonenumber, address, isAdmin) {
    const user = await User.findOne({ username: username });
    if (user) {
        alert("Username already exists. Please try another username.")
        console.log("Username already exists. Please try another username.")
    }
    else{
        const newuser = new User({
            username: username,
            password: password,
            phonenumber: phonenumber,
            address: address,
            isAdmin
        });
        await newuser.save()
        console.log("user added")
        return true;
    }

}
async function isAdmin(username) {
    const user = await User.findOne({ username: username });
    return user.isAdmin
}

module.exports = { login, register,isAdmin }