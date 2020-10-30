const express = require("express");
const bcrypt = require("bcrypt");
const { sessionChecker } = require("../middleware/auth");
const User = require("../models/users");
const isLogin = require('../middleware/checklogin')


const saltRounds = 10;
const router = express.Router();


router.get("/", isLogin, (req, res) => {
  let obj = {
    Inlogin: res.locals.isLogin,
    id: res.locals.id
  }
  res.render("main", obj);
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
