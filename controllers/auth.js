const User = require('../models/User');
const CustomError = require("../helpers/error/customError");
const asyncErrorWrapper = require("express-async-handler");

const register = asyncErrorWrapper(async (req,res,next) => {
    //POST DATA
    const{name,email,password,role} = req.body;

    //async await
    const user = await User.create({
        name,
        email,
        password,
        role
    });

    const token = user.generateJwtFromUser();
    console.log(token);


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