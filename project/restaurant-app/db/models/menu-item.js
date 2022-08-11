const mongoose = require("mongoose");

const menuItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    ingredients: {
        type: [String],
        required: true,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    category: {
        type: String,
        required: true,
        enum: {
            values: ["Appetizer", "Main Course", "Dessert"],
            message: "{VALUE} is not a valid category.",
        },
    },
});

module.exports = mongoose.model("MenuItem", menuItemSchema);
