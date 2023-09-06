const express = require('express');
const router = express.Router();
const Controller = require('../controller/index');

const { Blog } = Controller;
const { allBlogs, searchByCategory } = Blog;

router.get('/allBlogs', allBlogs);
router.get('/searchByCategory/:category', searchByCategory);

module.exports = router;

