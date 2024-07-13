const express = require('express');
const router=express.Router();

const { getUser, createUser, updateUser, sendOtp, verifyOtp } = require('../controllers/users.controller');
const { notFound }=require('../utility/utility')

router.get('/:id',getUser);

router.post('/',createUser);

router.put('/:id',updateUser);

router.post('/sendOtp',sendOtp);

router.post('/verifyOtp',verifyOtp);

router.all('/*',notFound)

module.exports=router;
