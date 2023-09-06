const express = require('express');
const multer = require('multer');

const auth = require('../auth/auth');
const Controller = require('../controller');

const { Admin } = Controller;
const { signup, signin, createBlog, allBlogs, searchByCategory, editBlog } = Admin;

const router = express.Router();
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
    }
});

const upload = multer({ storage: storage });

router.post('/signup', signup);
router.post('/signin', signin);
router.post('/createBlog', auth, upload.single('picture'), createBlog);
router.get('/allBlogs', auth, allBlogs);
router.get('/searchByCategory/:category', auth, searchByCategory);
router.post('/editBlog/:id', auth, upload.single('picture'), editBlog);

module.exports = router;