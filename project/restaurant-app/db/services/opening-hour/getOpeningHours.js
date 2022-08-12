const OpeningHour = require("../../models/opening-hour");

module.exports = async () => {
    return await OpeningHour.findOne().select("-__v").exec();
};
