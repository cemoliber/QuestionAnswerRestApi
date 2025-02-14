const User = require('../models/User');
const CustomError = require("../helpers/error/customError");
const asyncErrorWrapper = require("express-async-handler");

const register = asyncErrorWrapper(async (req,res,next) => {
    //POST DATA
    const name = "Berna Çınar";
    const email = "b.cinarr@icloud.com";
    const password = "123456";

   
    //async await
    const user = await User.create({
    name,
    email,
    password
    });

    res
    .status(200)
    .json({
        success : true,
        data : user
    });
});

//ErrorTest
const errorTest = (req,res,next) => {
    return next(new CustomError("Custom Error Message",400));
    
}

module.exports = {
    register,
    errorTest
};