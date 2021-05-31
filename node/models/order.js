const mongoos = require("mongoose");
const Schema = mongoos.Schema;

const orderSchema = new Schema({
    userId: {
        type: Number,
        required: true
    },
    productId: {
        type: Number,
        required: true
    }
}, {timestamps: true});

const Order = mongoos.model("Order", orderSchema);
module.exports = Order;