const User = require("../models/User");
const bcrypt = require("bcrypt");
const alert = require("alert");



async function login(username, password) {
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


async function isAdmin(username) {
    const user = await User.findOne({ username: username });
    return user.isAdmin
}
async function getUserID(username) {
    const user = await User.findOne({ username: username });
    return user._id
}


module.exports = { login,isAdmin,getUserID }