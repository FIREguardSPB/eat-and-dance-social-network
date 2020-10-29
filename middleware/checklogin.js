function islogin (req,res,next){
if(req.session && req.session.user){
  res.locals.isLogin = true
  res.locals.user=req.session.user
}else{
  res.locals.isLogin = false
}
next()
}
module.exports = islogin
