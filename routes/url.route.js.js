const express = require("express");
const router = express.Router();

const { generateShortURL, redirectToURL } = require("../controllers/url.controller");

router.post("/url", generateShortURL);
router.get("/:shortID", redirectToURL);

module.exports = router;