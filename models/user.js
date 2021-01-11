const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const UserSchema = mongoose.Schema({
    firstName:{
        type: String,
        required: [true,'Please Enter the FirstName'],
        maxlength: 100
    },
    lastName:{
        type: String,
        required: [true,'Please Enter the LastName'],
        maxlength: 100
    },
    email:{
        type: String,
        required: [true,'Please Enter the Email'],
        unique:1,
        trim:true

    },
    password:{
        type: String,
        required:[true,'Please Enter your Password'],
        minlength:8
    },
    confirmPassword:{
        type:String,
        required:[true,'Plase Enter your ConfirmPassword'],
        validate:{
            validator: function(el){
                return el === this.password
            },
            message:'password is not same'
        },
        minglength:8
    },
    passwordChangeAt:Date
});

UserSchema.pre('save',async function(req,res,next){

    // check if password is change or new password
    if(!this.isModified('password')) return next();
    try{
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password,salt);
        return next();

    }catch(err){
        return next(err);
    }

});

//compare password
UserSchema.methods.comparepassword = async function(currentpassword,dbPassword){
    return await bcrypt.compare(currentpassword,dbPassword)
}

UserSchema.methods.passwordChange = async function(jwtTimeStamp){

    if(this.passwordChangeAt){
        const passTimeStamp = parent(passwordChangeAt.getTime()/ 1000,10);
        return jwtTimeStamp < passTimeStamp;
    }
    //password not changed
    return false;
}

module.exports = mongoose.model('user',UserSchema);