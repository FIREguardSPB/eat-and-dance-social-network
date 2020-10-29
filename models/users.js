const { text } = require("express");
const mongoose = require("mongoose");
const Post = require('./posts')
const Commnet = require('./comments');
const Theme = require("./themes");

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
// Метод создания поста от имени текущего пользователя
userSchema.methods.createpost = async function (text, theme) {
  const themeRef = await Theme.findOne({ name: theme })
  const postsRef = await this.postsRef
  const post = new Post({
    postText: text,
    postDate: Date.now(),
    postAuthor: this._id,
    theme: themeRef._id
  })
  themeRef.posts.push(post._id)
  postsRef.push(post._id)
  await themeRef.save()
  await post.save()
  await this.save()
}

// Метод создания комментария под текущим постом от имени текущего пользователя
userSchema.methods.createcomment = async function (text, post, receiver) {
  const postsRef = await this.postsRef
  const commentRef = await Post.findOne({_id: post})
  const comment = new Commnet({
    postRef: post,
    commentText: text,
    commentDate: Date.now(),
    commentAuthor: this._id,
    toUser: receiver
  })
  postsRef.push(comment._id)
  commentRef.push(comment._id)
  await postsRef.save()
  await commentRef.save()
  await comment.save()
}

module.exports = mongoose.model('User', userSchema);
