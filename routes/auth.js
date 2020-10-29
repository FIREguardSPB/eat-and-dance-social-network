const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/users')

router.post('/registr',async(req,res)=>{
 const{username,email,password}=req.body
 const user = new User({
  username,email,password
 })
 await user.save()
 res.json({
   success: true,
   message: "Вы успешно зарегистрировались."
 })
})

router.post('/login',async(req,res)=>{
 const {email,password} = req.body
const user = await User.findOne({email})
if(user){
  if(password === user.password){
    req.session.user = user
    res.json({
      success: true,
      user: user
    })
  }
}else{
  res.json({
    success: false,
    message:  "Данный пользователь не зарегистрирован в системе."
  })
}
})
//личный кабинет

module.exports = router;
