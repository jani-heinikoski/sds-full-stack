const addUser = require("./db/services/user/addUser");
const User = require("./db/models/user");

module.exports = async () => {
    if ((await User.countDocuments().exec()) === 0) {
        console.log("No users found, creating default admin...");
        await addUser(
            new User({
                username: process.env.ADMIN_USERNAME || "admin",
                password: process.env.ADMIN_PWD || "password",
            })
        );
    }
};
