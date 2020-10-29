const { text } = require("express");
const mongoose = require("mongoose");
const Post = require('./posts')

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  regdate: { type: Date },
  userpic: { url: String },
  postsRef: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
  likesRef: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
  skillsFood: [{ type: String }],
  skillsDance: [{ type: String }]

});

userSchema.methods.createpost = async function (text, theme) {
  const post = new Post({
    postText: text,
    postDate: Date.now(),
    postAuthor: this._id,
    theme
  })
  await post.save()  
}

module.exports = mongoose.model('User', userSchema);
