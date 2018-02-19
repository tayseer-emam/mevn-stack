const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  title: { type: String, required: true },
  body: { type: String, required: true },
  date: {type: Date, default: new Date()}
});

module.exports = mongoose.model('Post', postSchema);