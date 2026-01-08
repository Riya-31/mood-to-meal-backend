const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const generateToken = (user) => {  //this function generate signed token
  jwt.sign(
    {
      userId: user._id,
   role: user.role,       //  payload
    },

    process.env.JWT_SECRET,  //secret key
    {
      expiresIn: process.env.JWT_EXPIRES_IN || "15m",   //option object
    }
  );
};


const signup = async({name,email,password})=>{
    const existingUser = await User.findOne({email});
    if(existingUser){
        throw new Error("User already registered with us")
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash =await bcrypt.hash(password,salt)

    const user = await User.create({
        name,
        email,
        passwordHash,
    })

    return{
        id:user._id,
        name:user.name,
        email:user.email
    };
};


const login= async({email,password})=>{
    const user = await User.findOne({email})

    if(!user){
        throw new Error('User is not registered with us')
    }

    const isMatch = await bcrypt.compare(password,user.passwordHash)

    if(!isMatch){
        throw new Error("Incorrect password")
    }

    const token = generateToken(user);

    return{
        token,
        user:{
            id:user._id,
            name:user.name,
            email:user.email,
            role:user.role
        }
    };
};

module.exports={
    signup,
    login
};



