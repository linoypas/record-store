const User = require('../models/User');
const mongoose = require("mongoose");
const alert = require("alert");

async function createUser(username, password, phonenumber, address, isAdmin) {
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
            isAdmin: isAdmin
        });
        await newuser.save()
        console.log("user added")
        return true;
    }

}
async function getUsers() {
        const getUsers = await User.find();
        return getUsers;
}

async function deleteUser(id){
    await User.findByIdAndDelete(id.trim());
}
async function updateUser(id, username, password,phonenumber, address, isAdmin) {
    const updatedUser = await User.findById(id.trim());
    if(!updatedUser)
        alert("user not found");
    updatedUser.username = username;
    updatedUser.password = password;
    updatedUser.phonenumber = phonenumber;
    updatedUser.address = address;
    updatedUser.isAdmin = isAdmin;

    await updatedUser.save();
    return updatedUser;
}

module.exports = {
    getUsers,
    deleteUser,
    updateUser,
    createUser
};