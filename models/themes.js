const mongoose = require('mongoose')
// модель тем
const themeSchema = new mongoose.Schema({
  name: { type: String, required: true }, // название темы
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }], // посты в теме
});

const Theme = new mongoose.model('Theme', themeSchema);
module.exports = Theme  
