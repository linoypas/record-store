const order = require('../models/Order');
const User = require('../models/User');
const product = require('../models/product');
const moment = require('moment-timezone'); 

const mongoose = require("mongoose");
const alert = require("alert");

console.log(order);

async function getOrdersByUsername(username) {
    try {
        const user = await User.findOne({ username: username });
        if (!user) {
            throw new Error("User not found");
        }
        const orders = await order.find({ username: user._id })
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
    } catch (error) {
        console.error("Error fetching orders for username:", error);
        throw error;
    }
}

async function getorder() {
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
async function updateorder(id, items) {
    const updatedorder = await order.findById(id.trim());
    if(!updatedorder)
        alert("order not found");
    updatedorder.items = items;
    await updatedorder.save();
    return updatedorder;
}

async function createorder(items,username, orderDate,totalAmount ) {
    try {
        const newUser = await User.findOne({ username: username })
        const newOrder = new order({
            items,
            username: newUser._id,
            orderDate: orderDate || Date.now(),
            totalAmount: totalAmount
        });
        const savedOrder = await newOrder.save();
        console.log("created order")
        return savedOrder;  
        }
        catch (error) {
        console.error('Error creating order:', error);
        throw error;
    }
}


module.exports = {
    getorder,
    deleteorder,
    updateorder,
    createorder,
    getOrdersByUsername
};