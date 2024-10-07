const User = require('../models/user');
const mongoose = require("mongoose");

async function getUsers() {
    const getUsers = await User.find();
    return getUsers;
}

async function deleteUser(id){
    await User.findByIdAndDelete(id.trim());
}
async function updateUser(id, username, password, address, phonenumber, isAdmin) {
    const updatedUser = await User.findById(id.trim());
    if(!updatedProduct)
        return null;
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