const mongoose = require('mongoose')
const Post = require('./posts')
// модель тем
const themeSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true}, // название темы
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }], // посты в теме
});

themeSchema.methods.showPosts = async function(){
  const posts = this.posts.populate('postText')
  console.log(posts);
// for(post in posts){
//   const newp = await Post.findOne({_id: posts[post]})
}
  

const Theme = new mongoose.model('Theme', themeSchema);

>>>>>>> main
module.exports = mongoose.model('Theme', themeSchema);
