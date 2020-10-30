const express = require('express')
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

// router.get('/', isLogin, (req, res) => {
//   const obj = {
//     Inlogin: res.locals.isLogin,
//     id: res.locals.id,
//     name: res.locals.name,
//     completed: res.locals.completed
//   }
//   res.render('index_dance', obj)
// })

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
router.get('/post/', async function (req, res) {
  const nameTheme = req.query.ID
  const postsOfThem = await Theme.findOne({
    _id: nameTheme
  })
  //Массив ID постов по выбранной теме
  const posts = await postsOfThem.showPosts()
  res.render('dance_posts', {
    name: posts
  })

})





// router.post('/ajax-create-post', async function(req, res) {
//   // const {post} = req.body
//   // const newPost = new Post({
//   //   completed: false,
//   //   text: todo
//   // })
//   // await newPost.save()

//   const {text} = req.body
//   console.log(text);
//   res.json({text, success: true})

// });

//===================.............>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// const Todo = require('../models/Todo')

// const router = express.Router()

// router.post('/', async (req ,res) => {
//   const { todo } = req.body
//   const newTodo = new Todo({
//     completed: false,
//     text: todo
//   })
//   await newTodo.save()
//   res.redirect('/')
// })

// router.post('/ajax', async (req, res) => {
//   const {todo} = req.body
//   const newTodo = new Todo({
//     completed: true,
//     text: todo
//   })
//   await newTodo.save()
//   res.json({newTodo, success: true})
// })

module.exports = router
