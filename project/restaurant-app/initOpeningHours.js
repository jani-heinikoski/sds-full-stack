const OpeningHour = require("./db/models/opening-hour");
const getOpeningHours = require("./db/services/opening-hour/getOpeningHours");

module.exports = async () => {
    const openingHours = await getOpeningHours();
    if (!openingHours) {
        console.log("Did not find any opening hours, creating...");
        await OpeningHour.create({});
    }
};
