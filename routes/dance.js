const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { sessionChecker } = require("../middleware/auth");
const User = require("../models/users");
const Post = require("../models/posts");
const Theme = require("../models/themes");

const saltRounds = 10;
// const app
// app.use(express.urlencoded({extended: true}))

//генерируем главную страницу раздела "DANCE"
router.get("/", async (req, res) => {
  const name = await Theme.find();

  // console.log(name)
  res.render("index_dance", { name: name, _id: name });
});


/* create newPost. */
router.get("/ajax-create-post", (req, res) => res.render("newPost"));
router.post("/ajax-create-post", async function (req, res) {
  const { newPost } = req.body;
  const user = await User.findOne({ username: "Davonte16" });
  await user.createpost(newPost, "placeat");
  res.redirect("/dance");
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
