const express = require("express");
const connectDB = require("./db.js");
const ItemModel = require("./models/Item.js");
const cors = require("cors");

const app = express();

app.use(express.json());

app.use(cors());

connectDB();

app.get("/", async (req, res) => {
    const response = await ItemModel.find();
    return res.json({ items: response });
});

app.post("/items", async (req, res) => { // create
    try {

        const newItem = new ItemModel({
            name: req.body.name,
            age: req.body.age
        });

        const savedItem = await newItem.save();
        res.status(201).json(savedItem);

    } catch (err) {

        res.status(400).json({ message: err.message });

    }
});

// example: curl -X POST http://localhost:3000/items -H "Content-Type: application/json" -d '{"name": "Kevin", "age": "26"}'

app.get("/items/:id", async (req, res) => {  // read
    try {
        const searchedItem = await ItemModel.findById(req.params.id);

        if (!searchedItem) {
            res.status(404).json({ message: "Item not found" });
        }

        res.json(searchedItem);

    } catch (err) {
        res.status(404).json({ message: err.message });
    }
});

// example: curl -X GET http://localhost:3000/items/66aec1e9b57ec28efb96dd40

app.put("/items/:id", async (req, res) => { // update

    try {

        const updatedItem = await ItemModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!updatedItem) {
            return res.status(404).json({ message: "Item not found" });
        }

        res.json(updatedItem);

    } catch (err) {

        res.status(404).json({ message: err.message });

    }
});

// example: curl -X PUT http://localhost:3000/items/66aeb2a1bf6b8f680037aa0f -H "Content-Type: application/json" -d '{"age": 30}'

app.delete("/items/:id", async (req, res) => { // delete

    try {

        const deletedItem = await ItemModel.findByIdAndDelete(req.params.id);
    
        if (!deletedItem) {
            res.status(404).json({ message: "File not founded!" });
        } 
    
        res.json({ message: "File successfull deleted" });

    } catch (err) {

        res.status(404).json({ message: err.message });

    }

});

// example: curl -X DELETE http://localhost:3000/items/66aec1e9b57ec28efb96dd40

app.listen(3000, () => {
    console.log("Express Server started");
});