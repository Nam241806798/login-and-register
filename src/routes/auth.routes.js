const express = require('express');
const {postUser,login} = require('../controller/auth.controller');
const router = express.Router();

router.post('/',postUser)
router.get('/login', login)

module.exports = router;