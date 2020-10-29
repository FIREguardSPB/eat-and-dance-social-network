const express = require('express')
const router = express.Router();
const isLogin = require("../middleware/checklogin")
// app.use(express.urlencoded({extended: true}))

//генерируем главную страницу раздела "FOOD"
router.get('/', isLogin,(req, res) =>{
  const obj = {
    Inlogin: res.locals.isLogin,
    id: res.locals.id
  }
  res.render('index_food',obj)
})


//принимаем запрос на геннерацию формы правки поста
router.get('/post-edit-form',isLogin, (req, res) => {
  const obj ={
    Inlogin: res.locals.isLogin,
    id: res.locals.id
  }
  res.render('post-edit-form',obj)
})
//принимаем данные на редактирование поста
router.post('/post-edit-form', (req, res) => {
  res.render('post-edit-form')
})
module.exports = router
