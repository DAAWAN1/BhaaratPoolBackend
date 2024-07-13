const { User } =require("../models/users.model");
const zod = require("zod");
const randomstring = require('randomstring');

const emailSchema=zod.string().email();
const passwordSchema = zod.string().min(6);
const phoneSchema=zod.number().min(1000000000).max(9999999999);
const nameSchema=zod.string();
const addharSchema=zod.number().min(100000000000).max(999999999999);
const addressSchema=zod.string();

const validate=(email,password,phoneNumber,name,address,aadharCardNumber)=>{

  try{
    emailSchema.parse(email) 
    passwordSchema.parse(password)
    if(phoneNumber)
    phoneSchema.parse(phoneNumber)
    nameSchema.parse(name)
    addressSchema.parse(address)
    addharSchema.parse(aadharCardNumber)
    return {"success":true};
  }catch(error){
    let message=JSON.parse(error.message)[0].message;
    return {message:message,"success":false}
  }
}

function generateOTP() {
  return randomstring.generate({
      length: 4,
      charset: 'numeric'
  });
}

const getUser= async(req,res)=>{
  const id=req.params.id;
  try{
      const user=await User.findOne({'_id':id});
      if(user){
          res.json({'success':true,'user':user}).status(200);
      }else{
        res.json({'success':false}).status(400);
      }
  }catch(error){
    res.json({'success':false,'message':error.message}).status(400);
  }
}

const createUser=async(req,res)=>{
  const {id}=req.params;
  const {email,password,name,address,aadharCardNumber}=req.body;
  let validateUser=validate(email,password,null,name,address,aadharCardNumber);
  if(validateUser.success){
    try{
      let user=await User.updateOne({'_id':id},{email,password,name,address,aadharCardNumber});
    }catch(error){
      res.json({'message':error.message,'success':false});
    }
    res.json({'message':'user created successfully','success':true})
  }else{
    res.json({'message':validateUser.message,'success':false})
  }
}

const updateUser=async(req,res)=>{
  const {email,password,phoneNumber,name,address,aadharCardNumber}=req.body;
  let validateUser=validate(email,password,phoneNumber,name,address,aadharCardNumber);
  if(validateUser.success){
    let id=req.params.id;
    const user=await User.findOne({'_id':id});
    if(user){
      await User.updateOne({'_id':id},{email,password,phoneNumber,name,address,aadharCardNumber});
      res.json({'message':'user updated successfully','success':true})
    }else{
      res.json({'message':'user does not exists','success':false});
    }
  }else{
    res.json({'message':validateUser.message,'success':false})
  }
}

const sendOtp=async(req,res)=>{
   const {phoneNumber}=req.body;
   let user=await User.findOne({phoneNumber});
   if(!user){
    user=new User({phoneNumber});
    await user.save();
  }
  const otp=generateOTP();
   try{
    await User.updateOne({'_id':user._id},{otp})
   }catch(error){
    res.json({'message':error.message,'success':false});
   }
   res.json({'message':'otp send successfully','succes':true});
}

const verifyOtp=async(req,res)=>{
  const {otp}=req.body;
  const user=await User.findOne({otp});
  if(user){
    try{
      await User.updateOne({'_id':user._id},{otp:null,is_validated:true})
    }catch(error){
      res.json({'message':error.message,'success':false});
    }
    res.json({'message':'user validated successfully','success':true})
  }
}

module.exports={
    getUser,createUser,updateUser,sendOtp,verifyOtp
}