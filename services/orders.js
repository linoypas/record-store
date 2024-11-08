const order = require('../models/Order');
const user = require('../models/User');
const product = require('../models/product');
const moment = require('moment-timezone'); 

const mongoose = require("mongoose");
const alert = require("alert");

async function getorders() {
        const orders = await order.find()
        .populate('items.name', 'name')
        .populate('username', 'username')
        .select('orderDate totalAmount items username');
        return orders.map(order => ({
            ...order.toObject(),
            username: order.username ? order.username.username : "Unknown",  
            items: order.items.map(item => ({
                name: item.name ? item.name.name : "Unnamed Product",  
                quantity: item.quantity
            })),
            orderDate: moment(order.orderDate).tz('Asia/Jerusalem').format('ddd DD/MM/YYYY') 
        }));
    }

async function deleteorder(id){
    await order.findByIdAndDelete(id.trim());
}
async function updateorder(id, username, items, totalAmount, orderDate) {
    const updatedorder = await order.findById(id.trim());
    if(!updatedorder)
        alert("order not found");
    updatedorder.username = username;
    updatedorder.items = items;
    updatedorder.totalAmount = totalAmount;
    updatedorder.orderDate = orderDate;
    await updatedorder.save();
    return updatedorder;
}

module.exports = {
    getorders,
    deleteorder,
    updateorder,
};