const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
    items: [
        {
            name: { type: String, required: true },
            image: { type: String, required: true },
            price: { type: Number, required: true },
            quantity: { type: Number, required: true },
        }
    ],
    totalPrice: { type: Number, required: true },
    orderDate: { type: Date, default: Date.now },
    orderStatus: { type: String, enum: ['Pending', 'Processing', 'Shipped', 'Delivered'], default: 'Pending' }
}, { timestamps: true });



const cartItemSchema = mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
}, { timestamps: true });




const userSchema = mongoose.Schema({
    username: { type: String, required: true },
    number: { type: Number, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    orders: [orderSchema],
    cart: [cartItemSchema] // Add cart items array
}, { timestamps: true });

const User = mongoose.model("users", userSchema);

module.exports = User;
