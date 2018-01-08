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
        password: hash
      });
      user.save()
        .then((user) => {
          res.status(201).json({
            _id: user._id,
            email: user.email,
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
            _id: user._id,
            email: user.email,
            token: jwtSign(user)
          });
        }
      });

    } catch (error) {
      res.status(403).json({
        message: 'Wrong email address or password'
      });
    }
  }
}