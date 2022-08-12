const express = require("express");
const passport = require("passport");
// DB Services
const getOpeningHours = require("../db/models/opening-hour");

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        return res.status(200).json({
            success: true,
            msg: "Opening hours",
            openingHours: await getOpeningHours(),
        });
    } catch (err) {
        console.error(err);
    }
    return res.status(500).json({
        success: false,
        msg: "Something went wrong",
    });
});

router.put(
    "/",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
        try {
            if (req.body.openingHours) {
                const openingHours = await getOpeningHours();
                for (const key in req.body.openingHours) {
                    openingHours[key] = req.body.openingHours[key];
                }
                const updatedHours = await openingHours.save();
                return res.status(200).json({
                    success: true,
                    msg: "Updated opening hours",
                    openingHours: updatedHours,
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
