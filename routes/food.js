const express = require('express')
const router = express.Router();
const isLogin = require("../middleware/checklogin")
// app.use(express.urlencoded({extended: true}))


const bcrypt = require("bcrypt");
const {  sessionChecker} = require("../middleware/auth");
const User = require("../models/users");
const Post = require('../models/posts')
const Theme = require('../models/themes')


const saltRounds = 10;


//генерируем главную страницу раздела "FOOD"
// router.get('/', isLogin,(req, res) =>{
//   const obj = {
//     Inlogin: res.locals.isLogin,
//     id: res.locals.id
//   }
//   res.render('index_food',obj)
// })


// //принимаем запрос на геннерацию формы правки поста
// router.get('/post-edit-form',isLogin, (req, res) => {
//   const obj ={
//     Inlogin: res.locals.isLogin,
//     id: res.locals.id
//   }
//   res.render('post-edit-form',obj)
// })
// //принимаем данные на редактирование поста
// router.post('/post-edit-form', (req, res) => {
//   res.render('post-edit-form')
// })
// module.exports = router
// const app
// app.use(express.urlencoded({extended: true}))

//генерируем главную страницу раздела "DANCE"

router.get('/',isLogin, async (req, res) => {
  const obj = {
    Inlogin: res.locals.isLogin,
    id: res.locals.id,
   }
  const name = await Theme.find({section: "food"})
  // console.log(name)
  res.render('index_food', {name: name, _id: name, ...obj})
})


/* create newPost. */
router
.route("/ajax-create-post")
.get(isLogin, (req, res) => {
  const obj = {
    Inlogin: res.locals.isLogin,
    id: res.locals.id,
   }
   const idTheme = req.query.ID

  res.render('newPost', {...obj, idTheme})})
.post(isLogin, async function (req, res) {
  const obj = {
    Inlogin: res.locals.isLogin,
    id: res.locals.id,
   }
  const {
    newPost
  } = req.body
  // console.log(newPost)
  // console.log(obj);
  const user = await User.findOne({
    _id: obj.id
  })
  // console.log(user);
  const idTheme = req.query.ID
  // console.log(idTheme);
  await user.createpost(newPost, idTheme)
  res.redirect('/food')

});
// Отображение постов
router.get("/post",isLogin,  async function (req, res) {
  const obj = {
    Inlogin: res.locals.isLogin,
    id: res.locals.id,
   }
  //Получаем ID темы
  const idTheme = req.query.ID;
  //Массив ID постов по выбранной теме
  const postsOfThem = await Theme.findOne({ _id: idTheme });
  const posts = postsOfThem.posts;

  //Показать текст постов темы.
  const viewPosts = await postsOfThem.showPosts();
  const list = viewPosts[0]
  res.render("food_posts", {list, ...obj, idTheme});
  
});

module.exports = router;
