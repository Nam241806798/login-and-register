const express = require('express');
const middleware = require('../controller/middleeware');
const {getUser,deleteUser} = require('../controller/user.controller')
const router = express.Router();

router.get('/', middleware.verifytoken, getUser);

router.delete('/:id', middleware.middlewareController,deleteUser);
module.exports = router;