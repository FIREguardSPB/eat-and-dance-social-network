const { localsAsTemplateData } = require('hbs');
const mongoose = require('mongoose')
const User = require('../models/users')
const Post = require('./posts')
// модель тем
const themeSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }, // название темы
  section: { type: String, required: true, unique: true }, // в какой раздел food/dance
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }], // посты в теме
});

themeSchema.methods.showPosts = async function () {
  const posts =  await Post.find({ theme: this.id })
  const authorList = posts.map(el => el.postAuthor)
  const users = []
  //for (const postAuthor of authorList) {
  //  users.push(await User.findOne({_id: postAuthor}))
  //}
  const postInfo = []
  postInfo.push(posts)
  postInfo.push(users)
  return postInfo;
}

const Theme = new mongoose.model('Theme', themeSchema);
module.exports = mongoose.model('Theme', themeSchema);
