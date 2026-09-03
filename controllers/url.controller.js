const urlModel = require("../models/url.model")
const { nanoid } = require("nanoid")

const generateShortURL = async (req, res) => {
    const { url } = req.body;
    if (!url) {
        return res.status(400).json({
            message: "please enter the url"
        })
    }
    const shortID = nanoid(8);

    await urlModel.create({
        shortID: shortID,
        redirectURL: url,
        visitHistory: []
    })

    return res.json({ id: shortID })
}

const redirectToURL = async (req, res) => {
    const shortID = req.params.shortID;
    const entry = await urlModel.findOneAndUpdate({ shortID }, {
        $push: {
            visitHistory: {
                timestamp: new Date()
            }
        }
    })
    if (!entry) {
        return res.status(404).json({
            message: "Short URL not found"
        });
    }
    return res.redirect(entry.redirectURL);
}

module.exports = { generateShortURL, redirectToURL }