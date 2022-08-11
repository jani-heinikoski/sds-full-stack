const MenuItem = require("../../models/menu-item");
module.exports = async (_id) => {
    return await MenuItem.findByIdAndDelete(_id).select("-__v").exec();
};
