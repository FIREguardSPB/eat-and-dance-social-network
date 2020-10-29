const express = require("express");
const bcrypt = require("bcrypt");
const { sessionChecker } = require("../middleware/auth");
const User = require("../models/users");
const isLogin = require('../middleware/checklogin')


const saltRounds = 10;
const router = express.Router();

router.get("/", (req, res) => {
  res.render("main", {id: req.session.user._id});
});


router
  .route("/registration")
  .get(sessionChecker, (req, res) => {
    res.render("signup");
  })
  .post(async (req, res, next) => {
    console.log(req.body);
    try {
      const { username, email, password } = req.body;
      const user = new User({
        username,
        email,
        password: await bcrypt.hash(password, saltRounds)
      });
      await user.save();
      req.session.user = user;

      res.redirect("/dance");

      res.redirect("/");
    } catch (error) {
      next(error);
    }
  });

router
  .route("/login")
  .get(sessionChecker, (req, res) => {
    res.render("login");
  })
  .post(async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
      req.session.user = user;

      res.redirect("/");


    } else {
      res.redirect("/login");
    }
  });

// router.get("/registration", (req, res) => {
//   const { user } = req.session;
//   if (req.session.user) {
//     res.render("signup", { name: user.username });
//   } else {
//     res.redirect("/login");
//   }
// });

router.get("/logout", async (req, res, next) => {
  if (req.session.user) {
    try {
      await req.session.destroy();
      res.clearCookie("user_sid");
      res.redirect("/");
    } catch (error) {
      next(error);
    }
  } else {
    res.redirect("/");
  }
});

module.exports = router;
