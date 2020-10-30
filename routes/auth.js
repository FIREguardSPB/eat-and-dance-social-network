const express = require('express');
const router = express.Router();
const isLogin = require('../middleware/checklogin')
const mongoose = require('mongoose');
const User = require('../models/users')
const { sessionChecker } = require('../middleware/auth');



// router.post('/registr',  async(req,res)=>{
//  const{username,email,password}=req.body
//  const user = new User({
//   username,email,password
//  })
//  await user.save()
//  res.json({
//    success: true,
//    message: "Вы успешно зарегистрировались."
//  })
// })

// router.post('/login',async(req,res)=>{
//  const {email,password} = req.body
// const user = await User.findOne({email})
// if(user){
//   if(password === user.password){
//     req.session.user = user
//     res.json({
//       success: true,
//       user: user
//     })
//   }
// }else{
//   res.json({
//     success: false,
//     message:  "Данный пользователь не зарегистрирован в системе."
//   })
// }
// })
//личный кабинет

router.get('/account/:id',isLogin, async(req,res)=>{
  try {
  const user = await User.findOne({_id:req.params.id})
  const params = {username: user.username,
    email: user.email,
    skillsDance: user.skillsDance,
    skillsFood: user.skillsFood,
    Inlogin: res.locals.isLogin,
    id: res.locals.id
  }
   res.render('personaccount', params)
 
  } catch (error) {
    res.send("о-то не так..")
    next(error);
  }
})

module.exports = router;
