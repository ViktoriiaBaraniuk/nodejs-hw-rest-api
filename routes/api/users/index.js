const express = require('express')
const router = express.Router()
const validate = require('./validation')
const usersController = require('../../../controllers/users')

router.post('/auth/register', validate.createUser, usersController.register)
router.post('/auth/login', usersController.login)

module.exports = router
