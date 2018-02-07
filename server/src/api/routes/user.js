const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const checkAuth = require('../middleware/check-auth');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, './uploads');
  },
  filename(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + '' + path.extname(file.originalname));
  }
});
const upload = multer({storage: storage, limits: {
  fileSize: 1024 * 1024 * 5
}});

const userController = require('../controllers/user');

router.post('/signup', userController.signup);
router.post('/signin', userController.signin);
router.put('/resetPassword', checkAuth, userController.resetPassword);
router.put('/updateInfo', upload.single('image'), checkAuth, userController.updateInfo);
router.get('/checkAuth', checkAuth, (req, res, next) => {
  res.json({message: 'ok'});
});

module.exports = router;