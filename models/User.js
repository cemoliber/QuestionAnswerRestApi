const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema
const jwt = require("jsonwebtoken");

const UserSchema = new Schema({

    name : {
        type : String,
        require : [true,"Please provide a name"]
    },
    email : {
        type : String,
        require : [true,"Please provide an email"],
        unique : true,
        match : [
            /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
            "Please provide a email"
        ]
    },
    role : {
        type : String,
        default : "user",
        enum : ["user","admin"]
    },
    password : {
        type : String,
        minlenth : [6,"Please provide a password with min 6 length"],
        require : [true,"Please provide a password"],
        select : false
    },
    createdAt : {
        type : Date,
        default : Date.now
    },
    title : {
        type : String,
    },
    about : {
        type : String,
    },
    place : {
        type : String,
    },
    website : {
        type : String,
    },
    profile_image : {
        type : String,
        default : "default.jpg"
    },
    blocked : {
        type : Boolean,
        default : false
    },
});

//User Schema Methods
UserSchema.methods.generateJwtFromUser = function(){
    const {JWT_SECRET_KEY,JWT_EXPIRE} = process.env;

    const payload = {
        id : this._id,
        name : this.name
    };

    const token = jwt.sign(payload,JWT_SECRET_KEY,{
        expiresIn : JWT_EXPIRE
    });
    return token;
}

UserSchema.pre("save",function(next){
    //Password not changed
    if(!this.isModified("password")){
        next();
    }
    bcrypt.genSalt(10,(err, salt) => {
        if(err) next(err);
        console.log(this);
        bcrypt.hash(this.password, salt, (err, hash) => {
            if(err) next(err);
            this.password = hash;
            next();
        });
      });
});

module.exports = mongoose.model("User",UserSchema);