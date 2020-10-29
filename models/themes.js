const { localsAsTemplateData } = require('hbs');
const mongoose = require('mongoose')
const Post = require('./posts')
// модель тем
const themeSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }, // название темы
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }], // посты в теме
});

themeSchema.methods.showPosts = async function () {
  return await Post.find({ theme: this.id })
  
}

const Theme = new mongoose.model('Theme', themeSchema);
module.exports = mongoose.model('Theme', themeSchema);
