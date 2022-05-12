const express = require('express');

const authentication = require('../middlewares/auth');
const { create, getAll, getById } = require('../controllers/post');

const router = express.Router();

router.use(authentication);
router.post('/', create);
router.get('/', getAll);
router.get('/:id', getById);

module.exports = router;