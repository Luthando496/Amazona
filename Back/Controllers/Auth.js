const User = require('../Models/User')
const catchAsync = require('../Middlewares/catchAsync')
const jwt = require('jsonwebtoken')
const ApiFeatures = require('../Utils/apiFeatures')
const catchA = require('../Middlewares/catch')
const byt = require('bcrypt')
const cloudinary = require('cloudinary')


cloudinary.config({
    cloud_name:'dezmcxbye',
    api_key:'749122274353157',
    api_secret:'GZecL2bZokhMM8TIi7IJbO9Y5yo'
})



exports.uploadIMG = async (req,res,next)=>{
    try{

        
        console.log(req.files.image.path)

        const result = await cloudinary.v2.uploader.upload(req.files.avatar.path ||req.files.image.path ,{
            folder:'images',
            width:150,
            crop:'scale'
        })

        if(!result){
            return res.status(400).json({message:'Something Went Wrong'})
        }

        console.log(result,'hello there')

        return res.status(200).json({url:result.secure_url,public_id:result.public_id})

    }catch(err) {
        return res.status(500).json({message:err,ey:'hollo'})
    }

    next()
}






exports.uploadFileImg = async (req,res,next)=>{


try{

    console.log(req.files.image.path)

    const result = await cloudinary.v2.uploader.upload(req.files.image.path,{
        folder:'images',
        width:150,
        crop:'scale'
    })

    if(!result){
        return res.status(400).json({message:'Something Went Wrong'})
    }

    console.log(result,'hello there')

    return res.status(200).json({url:result.secure_url,public_id:result.public_id})

}catch(err) {
    return res.status(500).json({message:err,ey:'hollo'})
}
}



exports.registerUser =  async (req, res, next)=>{

    try{

        
    console.log(req.body.avatar)
        const {name,password,email,avatar} = req.body;

        console.log(avatar)

        
        
        
        
    const user = await User.create({
        name,
        password,
        email,
        avatar:{
        public_id:avatar.public_id,
        url:avatar.url
    }})

    if(!user){
        return res.status(401).json({message: 'No User Created'})
    }

    const token = jwt.sign({_id:user.id},process.env.SCT,{
        expiresIn:process.env.EXP
    })
    
    const options = {
        expires:new Date(Date.now() + process.env.COOK * 24 *60 *60 *1000),
        httpOnly:true
    }

    return res.status(201).cookie('token', token,options).json({success: true,user,token})

}catch(err) {
    return res.status(500).json({message: err})
}


}


exports.Login = catchA(async (req, res, next)=>{


        
        const {password,email} = req.body;
        
        if(!password || !email){
            return next(new ApiFeatures('Please Type Email And Password',400))
    }
    
    
    const user = await User.findOne({email}).select('+password')

    if(!user){
        return next(new ApiFeatures('Invalid Email Or Password',401))
    }
    

    
    const match = await byt.compare(password,user.password)
    console.log(user.id,match)
    
    if(match === false){
        return res.status(401).json({message: 'Invalid Password'})
    }


    
    
    
    const token = await jwt.sign({_id:user.id},process.env.SCT,{
        expiresIn:process.env.EXP
        
    })




    const options = {
        expires:new Date(Date.now() + process.env.COOK * 24 *60 *60 *1000),
        httpOnly:true
    }
    
    return res.status(200).cookie('token', token,options).json({success: true,user:user,token})

    
})


exports.allUsers = async (req, res, next)=>{
    try{
        const users = await User.find()

        return res.status(200).json({success: true,users})
    }catch(err) {
        return res.status(500).json({success: false,err})
    }
}


exports.protect= async (req, res, next)=>{

try{
    // console.log(req.headers)
    let token;

    if(req.headers && req.headers.authorization){
        token = req.headers.authorization.split(' ')[1]
        // console.log(token)
    }else{
        return res.status(404).json({message:'PLEASE REGISTER OR LOGIN AGAIN'})
    }

            // console.log(token)
            const decoded = await jwt.verify(token,process.env.SCT)


            // 3. Check If USER Still exists
            // console.log(decoded)
            const freshUser = await User.findById(decoded._id).select('-password')
           
            // console.log(freshUser)
            
            
            if (!freshUser) {
                return res.status(401).json({message:'The user belonging to this token does no longer exist.'})
            }
            
            // 4.Check If USER Changed password after the token was issued
            // freshUser.changedPasswordAfter(decoded.iat)
            
            req.user = await freshUser


}catch(err){
   return res.status(500).json({message:err})
}

next()
}


exports.getMe = async (req, res, next)=>{
    try{

        const user = await User.findById(req.user._id)

        return res.status(200).json({success: true,user:user})
    }catch(err) {
        return res.status(500).json({success: false,err})
    }

    next()
}


exports.Logout = async (req, res, next)=>{
    try{

        res.cookie('token',null),{
            expiresIn:new Date(Date.now()),
            httpOnly:true
        }

        return res.status(200).json({success: true,message: 'Logged out'})


    }catch(err){
        return res.status(500).json({message:err})
    }
}