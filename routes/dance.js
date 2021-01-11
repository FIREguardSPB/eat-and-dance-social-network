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
  console.log(newPost)
  // console.log(obj);
  const user = await User.findOne({
    _id: obj.id
  })
  // console.log(user);
  const idTheme = req.query.ID
  console.log(idTheme);
  await user.createpost(newPost, idTheme)
  res.redirect('/dance')

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
  //Название темы в которой отображаем посты
  const nameTheme = postsOfThem.name
  const posts = postsOfThem.posts;

  //Показать текст постов темы.
  const viewPosts = await postsOfThem.showPosts();
console.log(viewPosts)

  const list = viewPosts[0]
  // const author = []
  // for (let postAuthor in list){author}

console.log(list.postText)
  res.render("dance_posts", {list, ...obj, idTheme, nameTheme});

});

module.exports = router;
