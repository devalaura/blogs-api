const express = require('express');

const authentication = require('../middlewares/auth');
const { create, getAll } = require('../controllers/category');

const router = express.Router();

router.use(authentication);
router.post('/', create);
router.get('/', getAll);

module.exports = router;