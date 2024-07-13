const mongoose= require('mongoose');

const UserSchema=new mongoose.Schema({
    'name':{
        type:String,
        default:'',
        required:false 
    },
    'phoneNumber':{
        type:Number,
        required:true,
        unique:true
    },
    'email':{
        type:String,
        required:false,
        trim:true,
        lowercase:true,
        default:''
    },
    'password':{
        type:String,
        required:false,
        select:false,
        default:''
    },
    'address':{
        type:String,
        required:false,
        default:''
    },
    'is_verified':{
        type:Boolean,
        default:false,
        required:false
    },
    'is_validated':{
        type:Boolean,
        default:false,
        required:false
    },
    'is_active':{
        type:Boolean,
        default:false,
        required:false
    },
    'aadharCardNumber':{
        type:Number,
        required:false,
        default:''
    },
    'otp':{
        type:Number,
        required:false,
        default:null,
        select:false
    }
})

const User = mongoose.model('User',UserSchema);

module.exports={
    User
}