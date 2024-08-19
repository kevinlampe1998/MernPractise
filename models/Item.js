const mongoose = require("mongoose");

const itemSchema = mongoose.Schema({
    name: String,
    age: String
});

const itemModel = mongoose.model("Item", itemSchema);

module.exports = itemModel;