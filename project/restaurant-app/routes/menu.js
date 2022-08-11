const express = require("express");
const passport = require("passport");
// DB Models
const MenuItem = require("../db/models/menu-item");
// DB Services
const getItems = require("../db/services/menu/getItems");
const addItem = require("../db/services/menu/addItem");

const router = express.Router();

router.get("/items", async (req, res) => {
    try {
        return res.status(200).json({
            success: true,
            msg: "All menu items",
            items: await getItems(),
        });
    } catch (err) {
        console.error(err);
    }
    return res.status(500).json({
        success: false,
        msg: "Something went wrong",
    });
});

router.post(
    "/items",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
        try {
            if (req.body.item) {
                const item = await addItem(
                    new MenuItem({
                        name: req.body.item.name,
                        ingredients: req.body.item.ingredients,
                        category: req.body.item.category,
                        price: req.body.item.price,
                    })
                );
                return res.status(201).json({
                    success: true,
                    msg: "Added new menu item",
                    item: item,
                });
            }
        } catch (err) {
            console.error(err);
        }
        return res.status(400).json({
            success: false,
            msg: "Error: invalid request body",
        });
    }
);

module.exports = router;
