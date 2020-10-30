const express = require('express')
const router = express.Router();
const bcrypt = require("bcrypt");
const { sessionChecker } = require("../middleware/auth");
const User = require("../models/users");
const Post = require('../models/posts')
const Theme = require('../models/themes')
const isLogin = require('../middleware/checklogin')

const saltRounds = 10;
// const app 
// app.use(express.urlencoded({extended: true}))

//генерируем главную страницу раздела "DANCE"

router.get('/', isLogin, (req, res) =>{
const obj = {
  Inlogin: res.locals.isLogin,
  id: res.locals.id
}
res.render('index_dance',obj)


// router.get('/post-edit-form', (req, res) => {
//   res.render()
})

/* create newPost. */
router.get('/ajax-create-post', (req, res) => res.render('newPost'))
router.post('/ajax-create-post', async function (req, res) {
  const { newPost } = req.body
  console.log(newPost)
  const user = await User.findOne({ username: 'Davonte16' })
  await user.createpost(newPost, 'placeat')

  res.redirect('/dance')

});
// Отображение постов
router.get('/post', async function (req, res) {
const nameTheme = req.query.ID
const postsOfThem = await Theme.findOne({_id: nameTheme})
console.log(postsOfThem)
//Массив ID постов по выбранной теме
// res.json(postsOfThem.posts)

const posts = postsOfThem.posts
console.log(posts)
let textViewPosts = []
let p 
// for (i=0; i<posts.length; i++){
//   p = await Post.findOne({_id: posts[i]})

//   // console.log(p[postText])
//   // console.log('\n',p)
//   // console.log(await Post.findOne({_id: posts[i]}))
// }
// console.log(p.postText)
textViewPosts = posts.map(el => {textViewPosts.push(Post.findOne({_id: el}))})
res.json(textViewPosts)

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
