const { URL } = require("../models/url");


async function handleHomePage(req,res){
    const allURL= await URL.find({});
    return res.render("home",{
        url:allURL, // way to pass on info..similar to props
        creator:"Rex"
    });
}
module.exports={handleHomePage};