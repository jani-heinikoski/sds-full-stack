const MenuItem = require("../../models/menu-item");

module.exports = async () => {
    return await MenuItem.find().select("-__v").exec();
};
