const express = require('express');
const router=express.Router();

const { getUser, createUser, updateUser, sendOtp, verifyOtp } = require('../controllers/users.controller');
const { notFound }=require('../utility/utility')

router.get('/:id',getUser);

router.post('/sendOtp',sendOtp);

router.post('/verifyOtp',verifyOtp);

router.post('/:id',createUser);

router.put('/:id',updateUser);

router.all('/*',notFound)

module.exports=router;
