const mongoose = require('mongoose')
// модель комментариев
const commentSchema = new mongoose.Schema({
  postRef: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' }, // к какому посту
  commentText: { type: String, required: true }, // текст коммента
  commentDate: { type: Date, default: Date.now }, // дата
  commentAuthor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // id автора
  toUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // в ответ юзеру
  likersRef: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // все, кто лайкнул
});

const Comment = new mongoose.model('Comment', commentSchema);
module.exports = Comment  
