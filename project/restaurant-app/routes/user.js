const express = require("express");
const jsonwebtoken = require("jsonwebtoken");
const passport = require("passport");
// DB Services
const getUserByUsername = require("../db/services/user/getUserByUsername");
const comparePassword = require("../db/services/user/comparePassword");
const updateUser = require("../db/services/user/updateUser");

const router = express.Router();

router.post("/authenticate", async (req, res) => {
    try {
        const user = await getUserByUsername(req.body.username);
        if (user) {
            const isMatch = await comparePassword(
                req.body.password,
                user.password
            );
            if (isMatch) {
                const token = jsonwebtoken.sign(
                    { _id: user._id },
                    process.env.SECRET,
                    {
                        expiresIn: 604800,
                    }
                );
                return res.status(200).json({
                    success: true,
                    msg: "User authenticated.",
                    user: {
                        _id: user._id,
                        username: user.username,
                    },
                    token,
                });
            }
        }
    } catch (err) {
        console.error(err);
    }
    return res
        .status(400)
        .json({ success: false, msg: "Failed to authenticate." });
});

router.put(
    "/update-credentials",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
        try {
            const updatedUser = await updateUser(
                req.user,
                req.body.username,
                req.body.password
            );
            return res.status(200).json({
                success: true,
                msg: "Credentials updated",
                user: {
                    _id: updatedUser._id,
                    username: updatedUser.username,
                },
            });
        } catch (err) {
            console.error(err);
        }
        return res
            .status(400)
            .json({ success: false, msg: "Failed to update credentials." });
    }
);

module.exports = router;
