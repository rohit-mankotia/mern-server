const express = require('express');

const Routes = require('./index');

const router = express.Router();

const { Admin, Blog } = Routes;

router.use('/', Blog);
router.use('/admin', Admin);

module.exports = router;