const User = require('../models/User');
const mongoose = require("mongoose");
const alert = require("alert");

async function getUsers() {
        const getUsers = await User.find();
        return getUsers;
}

async function deleteUser(id){
    await User.findByIdAndDelete(id.trim());
}
async function updateUser(id, username, password, address, phonenumber, isAdmin) {
    const updatedUser = await User.findById(id.trim());
    if(!updatedUser)
        alert("user not found");
    updatedUser.username = username;
    updatedUser.password = password;
    updatedUser.address = address;
    updatedUser.phonenumber = phonenumber;
    updatedUser.isAdmin = isAdmin;

    await updatedUser.save();
    return updatedUser;
}

module.exports = {
    getUsers,
    deleteUser,
    updateUser,
};