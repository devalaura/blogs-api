const express = require('express');

const authentication = require('../middlewares/auth');
const { create } = require('../controllers/category');

const router = express.Router();

router.use(authentication);
router.post('/', create);

module.exports = router;