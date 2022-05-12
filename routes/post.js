const express = require('express');

const authentication = require('../middlewares/auth');
const { create } = require('../controllers/post');

const router = express.Router();

router.use(authentication);
router.post('/', create);

module.exports = router;