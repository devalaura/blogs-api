const express = require('express');

const authentication = require('../middlewares/auth');
const { createUser, getUsers } = require('../controllers/user');

const router = express.Router();

router.post('/', createUser);
router.get('/', authentication, getUsers);

module.exports = router;