const express = require('express');

const authentication = require('../middlewares/auth');
const { createUser, getUsers, getById } = require('../controllers/user');

const router = express.Router();

router.post('/', createUser);

router.use(authentication);

router.get('/', getUsers);
router.get('/:id', getById);

module.exports = router;