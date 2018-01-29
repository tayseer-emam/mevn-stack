const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

function jwtSign(user) {
  return jwt.sign({
    _id: user._id,
    email: user.email
  },
  'secret', {
    expiresIn: '1d'
  });
}

module.exports = {
  async signup(req, res) {
    try {
      const hash = await bcrypt.hash(req.body.password, 10);
      const user = new User({
        _id: mongoose.Types.ObjectId(),
        email: req.body.email,
        name: req.body.name,
        password: hash
      });
      user.save()
        .then((user) => {
          res.status(201).json({
            user: {
              _id: user._id,
              email: user.email,
              name: user.name,
              image: user.image ? 'http://localhost:8081/' + user.image : ''
            },
            token: jwtSign(user)
          });
        })
        .catch((err) => {
          res.status(500).json(err);
        });
    } catch (error) {
      res.status(500).json({
        error: error
      });
    }
  },
  async signin(req, res) {
    const query = { email: req.body.email };
    try {

      const user = await User.findOne(query);
      if(!user) {
        return res.status(403).json({
          message: 'Wrong email address or password'
        });
      }

      bcrypt.compare(req.body.password, user.password, (err, pass) => {
        if(err || !pass) {
          res.status(403).json({
            message: 'Wrong email address or password'
          });
        }
        if(pass) {
          res.status(200).json({
            user: {
              _id: user._id,
              email: user.email,
              name: user.name,
              image: user.image ? 'http://localhost:8081/' + user.image : ''
            },
            token: jwtSign(user)
          });
        }
      });

    } catch (error) {
      res.status(403).json({
        message: 'Wrong email address or password'
      });
    }
  },
  async updateInfo(req, res) {
    const query = { _id: req.body._id };
    try {
      let fields = {};
      if(req.file)
        fields = {image: req.file.path, name: req.body.name};
      else
        fields = {name: req.body.name};
      const user = await User.findOneAndUpdate(query, fields, {new: true});
      
      res.status(200).json({
        user: {
          _id: user._id,
          email: user.email,
          name: user.name,
          image: user.image ? 'http://localhost:8081/' + user.image : ''
        },
        message: 'Your Information has been updated successfully'
      });
    } catch (error) {
      res.status(403).json({
        message: 'Update Failed'
      });
    }
  },
  async resetPassword(req, res) {
    const query = { _id: req.body._id };
    try {
      const user = await User.findOne(query);
      const validate = await bcrypt.compare(req.body.oldPassword, user.password);
      if(!validate) {
        res.status(403).json({
          message: 'Wrong password'
        });
      }
      if(validate && (req.body.newPassword === req.body.newMatchPassword)) {
        const hash = await bcrypt.hash(req.body.newPassword, 10);
        const updatedUser = await User.findOneAndUpdate(query, { password: hash }, {new: true});
        res.status(200).json({
          message: 'Password reset successful'
        });
      } else {
        res.status(403).json({
          message: 'Error in reset password'
        });
      }
    } catch (error) {
      res.status(403).json({
        message: 'Error in reset password'
      });
    }
  }
}