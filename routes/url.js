const express=require("express");
const { handleGenerateNewShortURL, handleRedirectfromShortURL, handleAnalyticsforShortURL } = require("../controllers/url.js");

const router=express.Router();

router
.route("/")
.post(handleGenerateNewShortURL);

router
.route("/:shortId")
.get(handleRedirectfromShortURL);

router
.route("/analytics/:shortId")
.get(handleAnalyticsforShortURL);

module.exports=router;