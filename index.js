require("dotenv").config()
const express =require("express");
const path = require("path");
const urlRoute= require("./routes/url");
const staticRoute=require("./routes/staticRouter");
const userRoute= require("./routes/userRouter");
const connectDB = require("./connection");
// const { restrictToLoggedinUsers } = require("./middleware/auth");
const { restrictToLoggedinUsers } = require("./middleware/authJWT");
const cookieParser = require("cookie-parser");

const app=express();
const PORT= process.env.PORT || 8001;
// db connection
 connectDB(process.env.MONGO_URL ||"mongodb://127.0.0.1:27017/short_url")
 .then(()=>{console.log('MongoDB connected')})
 .catch((err)=>{console.log('err connecting DB',err)});

//  setting views
 app.set("view engine","ejs");
 app.set("views",path.resolve("./views"));

// Middlewares
app.use(express.urlencoded({extended:true}));
app.use(express.json({extended:true}));
app.use(cookieParser());// used to parse cookies

app.use("/url",restrictToLoggedinUsers,urlRoute); //here restrict is inline middleware
app.use("/",staticRoute);
app.use("/user",userRoute);

app.listen(PORT,()=>{console.log(`Server running at port:${PORT}`)});