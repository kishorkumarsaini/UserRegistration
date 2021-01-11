const jwtwebtoken = require('jsonwebtoken');
const UserModel = require('./../models/user');
const {promisify} = require('util');


exports.signIn = async(req,res)=>{
    console.log('signIn');
    try{
         const newUser = await UserModel.create(req.body);
         const id =  newUser._id;
         console.log(newUser);
         const token = jwtwebtoken.sign({id},'my-ultra-jwt-securekey-user',{expiresIn:'90d'});
         console.log(token);
         res.status(201).json({
             token,
             status:'sucess',
             user:newUser
         })

    }catch(err){

        res.status(400).json({
            message:err,
            status:'fail'
        })

    }

}

exports.login = async(req,res,next)=>{

    try{
        const {email,password}= req.body;

        //check email and password is valid
        console.log(email,password);

        if(!email || !password) return res.send('email or password is not exists');

        //check user is exist or not

        const user = await UserModel.findOne({email}).select('+password');
        console.log(user);

        if(!user || !(await user.comparepassword(password,user.password))) return res.send('user does not exist');

        const id =user._id;
        const token = jwtwebtoken.sign({id},'my-ultra-jwt-securekey-user',{expiresIn:'90d'});
         res.status(200).json({
             token,
             status:'sucess',
             data:{
                 user
             }
         })

    }catch(err){
        res.status(400).json({
            message:err,
        status:'fail'        
    })
    }
}


exports.protect = async(req,res,next)=>{
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
    {
        token = req.headers.authorization.split(' ')[1];

    }   
    if(!token) return res.send('token does not existYou are not login please login for get access');
    //decode the token
    const decode = await promisify(jwtwebtoken.verify(token,'my-ultra-jwt-securekey-user'));
    //const decode = jwtwebtoken.verify(token, process.env.JWT_SECRET);

    //get current user

    const currentUser = await UserModel.findById(decode.id);

    // check current user

    if(!currentUser) return res.send('The user belong to this token does no longer exists');

    // check this user not change password after jwt issue

    if(currentUser.passwordChange(decode.iaf)){
        return res.send('user recently change password please login again');
    }

    req.user = currentUser;
    next();

}