const mongoose = require('mongoose')

// модель постов пользователей
const postSchema = new mongoose.Schema({
  postText: { type: String, required: true }, //текст поста
  postDate: { type: Date, default: Date.now }, //дата
  postAuthor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // id автора
  likersRef: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // список лайкнувших
  theme: { type: mongoose.Schema.Types.ObjectId, ref: 'Theme' }, // тема в которой пост
  commentRef: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }], // список комментов
});

module.exports = mongoose.model('Post', postSchema);
