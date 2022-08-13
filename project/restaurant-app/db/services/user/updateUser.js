const bcryptjs = require("bcryptjs");

module.exports = async (userToUpdate, newUsername, newPassword) => {
    userToUpdate.username = newUsername;
    const salt = await bcryptjs.genSalt(10);
    const hash = await bcryptjs.hash(newPassword, salt);
    userToUpdate.password = hash;
    return await userToUpdate.save();
};
