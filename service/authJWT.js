const jwt= require("jsonwebtoken");
const secret="REXconfigsJWT_Auth";

function setUser(user){
    
  return jwt.sign({
    name: user.name,
    email: user.email,
  },secret)
}

function getUser(token){
  return  jwt.verify(token,secret);
}

module.exports={
    getUser,setUser
}