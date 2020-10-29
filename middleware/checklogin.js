function islogin (req,res,next){
if(req.session && req.session.user){
  res.locals.isLogin = true
  res.locals.id = req.session.user._id
}else{
  res.locals.isLogin = false
}
next()
}
module.exports = islogin
