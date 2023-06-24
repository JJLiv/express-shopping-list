const Item = require("./item");
const express = require("express");
const router = new express.Router();



router.get('/items', (req, res, next) => {
    try {
        return res.json({items: Item.findAll() });
    } catch(err) {
        return next(err);
    }
});



router.post("/items", (req, res, next) => {
    try {
        let newItem = new Item(req.body.name, req.body.price);
        return res.json({item: newItem});
    } catch (err) {
        return next(err);
    }
});



router.get("/items/:name", (req, res, next) => {
    try {
        let item = Item.find(req.params.name);
        return res.json({item : item});
    } catch (err) {
        return next(err);
    }
});



router.patch("/items/:name", (req, res, next) => {
    try {
        let item = Item.edit(req.params.name, req.body);
        return res.json({ item: item});
    } catch (err) {
        return next(err);
    }
});



router.delete("/items/:name", (req, res, next) => {
    try{
        Item.remove(req.params.name);
        return res.json({message: "Deleted"});
    } catch (err) {
        return next(err);
    }
});







module.exports = router;