const { getUser } = require("../service/authJWT");

async function restrictToLoggedinUsers(req,res,next){
    const userUid=req.cookies?.uid;
    if(!userUid){
        return res.redirect("/login");
    }
    const user= await getUser(userUid);
    if(!user){
        return res.redirect("/login");
    }
        
        req.user=user;

    next();
} 

module.exports={restrictToLoggedinUsers};