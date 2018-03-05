const mongoose = require('mongoose');
const Post = require('../models/post');

module.exports = {
  async create(req, res) {
    const postData = new Post({
      _id: mongoose.Types.ObjectId(),
      user: req.body.user,
      title: req.body.title,
      body: req.body.body
    });

    try {
      const post = await postData.save();
      res.status(200).json({
        post,
        message: 'Post Created successfully'
      });
    } catch (error) {
      res.status(403).json({
        error,
        message: 'Post not saved'
      });
    }
  },
  async getPosts(req, res) {
    try {
      const posts = await Post.find({});
      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json({
        message: 'An error occurred'
      });
    }
  },
  async getPost(req, res) {
    const query = { _id: req.params.id }
    try {
      const post = await Post.findOne(query);
      if(!post) {
        return res.status(404).json({
          message: 'Can\'t Find This Post'
        });
      } else {
        res.status(200).json(post);
      }
    } catch (error) {
      res.status(500).json({
        message: 'An error occurred'
      });
    }
  },
  async updatePost(req, res) {
    const query = { _id: req.body._id };
    const fields = {
      title: req.body.title,
      body: req.body.body
    }
    try {
      const post = await Post.findOneAndUpdate(query, fields, { new: true });
      console.log(post);
      if(!post) {
        return res.status(404).json({
          message: 'Can\'t Find This Post'
        });
      } else {
        res.status(200).json({
          post,
          message: 'Post Updated successfully'
        });
      }
    } catch (error) {
      res.status(500).json({
        message: 'An error occurred'
      });
    }
  }
}