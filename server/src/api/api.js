const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({message: 'api works'});
});

router.use('/user', require('./routes/user'));
router.use('/post', require('./routes/post'));

module.exports = router;