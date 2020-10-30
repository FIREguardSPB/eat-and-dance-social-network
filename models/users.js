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
  const themeRef = await Theme.findOne({ _id: theme }) // ищется тема, чтобы добавить пост в список
  const postsRef = await this.postsRef // посты юзера
  const post = new Post({ 
    postText: text,
    postDate: Date.now(),
    postAuthor: this._id,
    theme: themeRef._id
  })
  themeRef.posts.push(post._id) //добавляем в тему
  postsRef.push(post._id) //добавляем юзеру
  await themeRef.save()
  await post.save()
  await this.save()
}

// Метод создания комментария под текущим постом от имени текущего пользователя
userSchema.methods.createcomment = async function (text, post, receiver) { // 
  const postsRef = await this.postsRef //комменты пишутся в посты юзера
  const refPost = await Post.findOne({_id: post}) //ищется пост, которому припишется коммент
  const comment = new Commnet({
    postRef: post,
    commentText: text,
    commentDate: Date.now(),
    commentAuthor: this._id,
    toUser: receiver
  })
  postsRef.push(comment._id) //добавляем юзеру
  refPost.commentRef.push(comment._id) // в комменты к посту
  await refPost.save()
  await this.save()
  await comment.save()
}

module.exports = mongoose.model('User', userSchema);
