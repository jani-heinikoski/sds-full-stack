const OpeningHour = require("../../models/opening-hour");

module.exports = async () => {
    return await OpeningHour.findOne()
        .select("monday tuesday wednesday thursday friday saturday sunday")
        .exec();
};
