
const { User } = require("../models/user");
const { setUser } = require("../service/authJWT");

async function handleUserSignup(req,res){ //handling post request
    const {name,email,password}=req.body;
    await User.create({
        name:name,
        email:email,
        password:password,
    })
    return res.redirect("/");
}
async function handleUserLogin(req,res){ //handling post request
    const {email,password}=req.body;
    const user=await User.findOne({
        email,
        password,
    })
    if(user){
        
        const token=setUser(user); //mapping uuid with signed in user
        res.cookie("uid",token);
        return res.redirect("/");
    }
    else{
        return res.render("login",{error:"invalid username or password"});
    }
}
module.exports={handleUserSignup,handleUserLogin}