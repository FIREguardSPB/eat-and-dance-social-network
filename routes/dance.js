const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const {
  sessionChecker
} = require("../middleware/auth");
const User = require("../models/users");

const Post = require('../models/posts')
const Theme = require('../models/themes')
const isLogin = require('../middleware/checklogin')


const saltRounds = 10;
// const app
// app.use(express.urlencoded({extended: true}))

//генерируем главную страницу раздела "DANCE"

router.get('/',isLogin, async (req, res) => {
  const obj = {
    Inlogin: res.locals.isLogin,
    id: res.locals.id,
   }
  const name = await Theme.find()
  // console.log(name)
  res.render('index_dance', {name: name, _id: name, ...obj})
})


/* create newPost. */
router
.route("/ajax-create-post")
.get(isLogin, (req, res) => {
  const obj = {
    Inlogin: res.locals.isLogin,
    id: res.locals.id,
   }
  res.render('newPost', obj)})
.post(isLogin, async function (req, res) {
  const obj = {
    Inlogin: res.locals.isLogin,
    id: res.locals.id,
   }
  const {
    newPost
  } = req.body
  console.log(newPost)
  console.log(obj);
  const user = await User.findOne({
    _id: obj.id
  })
  console.log(user);
  await user.createpost(newPost, 'Вкусная тема 1')
  res.redirect('/dance')

});
// Отображение постов
router.get("/post", async function (req, res) {
  //Получаем ID темы
  const nameTheme = req.query.ID;
  //Массив ID постов по выбранной теме
  const postsOfThem = await Theme.findOne({ _id: nameTheme });
  const posts = postsOfThem.posts;

  //Показать текст постов темы.
  const viewPosts = await postsOfThem.showPosts();
  res.render("dance_posts", { viewPosts});
  
});

module.exports = router;
