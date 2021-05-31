const mongoos = require("mongoose");
const Schema = mongoos.Schema;

const productSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
}, {timestamps: true});

const Product = mongoos.model("Product", productSchema);
module.exports = Product;