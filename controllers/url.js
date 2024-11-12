const { response } = require("express");
const {URL}=require("../models/url");
// const {nanoid}=require("nanoid");.....as nanoid is ES module,import via:

async function handleGenerateNewShortURL(req,res){
    
    // Dynamic importing nanoid 
    const { nanoid } = await import('nanoid');

    const body=req.body;
    const shortID= nanoid(8);
    if(!body){
        return res.status(400).json({err:`url missing`});
    }
     await URL.create({
        shortId:shortID,
        redirectURL:body.url,
        visitHistory:[]
    })
    return res.status(201).render("home",{id:shortID });
    // return res.status(201).json({shortURL:`${shortID}`});
};

 async function handleRedirectfromShortURL(req,res){
    const shortId = req.params.shortId;
    const entry=await URL.findOneAndUpdate(
        {shortId},
        {$push:{
            visitHistory:{timestamp:Date.now(), }
        }}
        );
        if (!entry) {
            return res.status(404).json({ error: "Short URL not found" });
        }
       return res.redirect(entry.redirectURL);
 };

 async function handleAnalyticsforShortURL(req,res){
   
    const shortId = req.params.shortId;
    const entry=await URL.findOne({shortId});
        if (!entry) {
            return res.status(404).json({ error: "Short URL not found" });
        }
       return res.json({totalClicks:entry.visitHistory.length,Analytics:entry.visitHistory});
 };

module.exports={handleGenerateNewShortURL,handleRedirectfromShortURL,handleAnalyticsforShortURL}