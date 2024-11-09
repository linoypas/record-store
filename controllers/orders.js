const orderService = require("../services/orders");
const productService = require("../services/product");

const Product = require("../models/product");

async function showorders(req, res) {
    const username = req.session.username || 'Guest';
    const isAdmin = req.session.isAdmin || false;
    const orders = await orderService.getorders();

     const ordersList = orders.map(orders =>({
        _id: orders._id,
        username: orders.username,
        items: orders.items,
        totalAmount: orders.totalAmount,
        orderDate: orders.orderDate,
      }));

    if(isAdmin){
        if(orders.length === 0){
            res.status(404).render('../views/error', { message: "לא קיימות הזמנות" ,isAdmin,username});
        }
        res.render('../views/orders', {orders:ordersList, username,isAdmin});
    }
    else
        res.status(403).render('../views/error', { message: "PERMISSION DENIED" ,isAdmin,username});
}
async function getorder(req,res){
    const order = await orderService.getorder(req.params.id);
    if(!order) {
        return res.status(404).json({errors: ['not found']})
    }
    res.json(order);
}

async function updateorder(req,res) {
    let items=req.body.items;
    for (const item of items) {
        const productId = await productService.getProductIdByName(item.name)        
        if (!productId) {
            return res.status(400).send('Product not found');
        }
        if (productId) {
            item.name = productId;  
        }
        if(item.quantity <=0){
            items = items.filter(i => i !== item);
        }

    }
    const order = await orderService.updateorder(
        req.params.id,
        items);
        
    if(!order){
        console.log('fail: update order')
        res.status(500).send("חלה שגיאה בעת עדכון ההזמנה");
    }
    console.log('done: update order');
    res.json(order);
}

async function deleteorder(req,res){
    try{
        const order = await orderService.deleteorder(req.params.id);
        console.log('done: delete order')
        res.status(200).send('ההזמנה נמחקה בהצלחה');
    } catch(err){
        console.log('fail: delete order')
        res.status(500).send("חלה שגיאה בעת מחיקת ההזמנה");
    }       
}
async function showcart(req,res){
    try {
        const username = req.session.username || 'Guest';
        const isAdmin = req.session.isAdmin || false;
        const orderDate = new Date()
        const items = req.session.items || [];
        //const totalAmount=orderService.getPrice(items)
        const totalAmount = 0;
        const detailedItems = [];

        for (const item of items) {
            const product = await Product.findById(item.id); // Query product by id
            if (product) {
                // Add the product name to the item
                detailedItems.push({
                    id: item.id,
                    name: product.name, // Assume the Product model has a `name` field
                    quantity: item.quantity,
                    price: product.price, // Optional: include price if needed for totalAmount
                });
            }
        }

        // Log the detailed items
        console.log(detailedItems);

        res.render('../views/cart', {username,isAdmin,totalAmount, orderDate, items });
      } catch (error) {
        res.status(500).json({ message: error.message });
      }

}

async function updatecart(req,res){
    console.log(req.session.items)
    const id = req.params.id;
    const quantity = req.body.quantity;
    if (!req.session.items) {
        req.session.items = [];
    }
    const existingProductIndex = req.session.items.findIndex(item => item.id === id);

    if (existingProductIndex !== -1) {
        req.session.items[existingProductIndex].quantity += quantity;
    } else {
        req.session.items.push({ id, quantity });
    }
       console.log(req.session.items)
       console.log(req.session)
       req.session.save((err) => {
        if (err) {
            return res.status(500).json({ message: 'Failed to save session' });
        }
        res.status(200).json({ message: 'Cart updated successfully', items: req.session.items });
    });
}

module.exports = {
    getorder,
    deleteorder,
    updateorder,
    showorders,
    updatecart,
    showcart
}