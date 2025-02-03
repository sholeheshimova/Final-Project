const userModels = require("../models/userModels")
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
require('dotenv').config()



const register = async (req,res) => {
    const {email, name, password} = req.body
    try {
        
        const exitsUser = await userModels.findOne({email})
        if (exitsUser) {
           return res.json({
                message: "this email is exist"
            })
        }
       const hashedPassword = await bcrypt.hash(password, 10);

        const newUser =  new userModels({...req.body, password: hashedPassword})
        await newUser.save()
        res.json({
            messsage: "successfully registered"
        })
    } catch (error) {
        console.error(error); 
        res.status(500).json({
            message: "error"
        });
    }
};

const login = async (req,res) => {
    const {email,password} = req.body
    try {
         const exitsUser = await userModels.findOne({email})
         if (!exitsUser) {
          return  res.json({
                message: "email is not correct"
            })
         }
       const isPasswordOk =  await bcrypt.compare(password, exitsUser.password);
       if (!isPasswordOk) {
        return  res.json({
            message: "password is not correct"
        })
       }

      const token =  jwt.sign({
        email: exitsUser.email, role: exitsUser.role
      }, process.env.JWT_SECRET, { expiresIn: "4w" });

      console.log(token);
      

       res.json({
        message: "logined is successfully", exitsUser,token
       })
    } catch (error) {
        res.json({
            message: "error"
        })
    }
}

module.exports = {
    register,
    login
}