const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  regdate: { type: Date },
  userpic: { url },
  postsRef: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
  likesRef: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
  skillsFood: [{type: String}],
  skillsDance: [{type: String}]

});

module.exports = mongoose.model('User', userSchema);
