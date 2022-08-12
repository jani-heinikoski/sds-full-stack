const mongoose = require("mongoose");

const openingHourSchema = new mongoose.Schema({
    monday: {
        type: String,
        default: "",
    },
    tuesday: {
        type: String,
        default: "",
    },
    wednesday: {
        type: String,
        default: "",
    },
    thursday: {
        type: String,
        default: "",
    },
    friday: {
        type: String,
        default: "",
    },
    saturday: {
        type: String,
        default: "",
    },
    sunday: {
        type: String,
        default: "",
    },
});

module.exports = mongoose.model("OpeningHour", openingHourSchema);
