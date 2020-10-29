const express = require('express')
const router = express.Router();
const bcrypt = require("bcrypt");
const { sessionChecker } = require("../middleware/auth");
const User = require("../models/users");

const saltRounds = 10;
// const app 
// app.use(express.urlencoded({extended: true}))

//генерируем главную страницу раздела "DANCE"
router.get('/', (req, res) =>
res.render('index_dance'))
// router.get('/post-edit-form', (req, res) => {
//   res.render()
// })

/* create newPost. */
router.get('/ajax-create-post', async function(req, res) {
  // const {post} = req.body
  // const newPost = new Post({
  //   completed: false,
  //   text: todo
  // })
  // await newPost.save()
  
  res.render('newPost')
  
});
router.post('/ajax-create-post', async function(req, res) {
  // const {post} = req.body
  // const newPost = new Post({
  //   completed: false,
  //   text: todo
  // })
  // await newPost.save()
  
  const {text} = req.body
  console.log(text);
  res.json({text, success: true})
  
});

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
