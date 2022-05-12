const express = require('express');

const authentication = require('../middlewares/auth');
const { create, getAll, getById, update, destroy } = require('../controllers/post');

const router = express.Router();

router.use(authentication);
router.post('/', create);
router.get('/', getAll);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', destroy);

module.exports = router;