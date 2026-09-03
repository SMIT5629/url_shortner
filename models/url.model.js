const mongoose = require("mongoose");

const UrlSchema = new mongoose.Schema({
    shortID: {
        type: String,
        required: true,
        unique: true,
    },
    redirectURL: {
        type: String,
        required: true,
    },
    visitHistory: [
        {
            timestamp: {
                type: Date,
                default: Date.now,
            },
        },
    ],
},
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("url", UrlSchema);