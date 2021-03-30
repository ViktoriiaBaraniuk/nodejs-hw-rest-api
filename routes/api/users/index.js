const express = require('express')
const router = express.Router()
const validate = require('./validation')
const usersController = require('../../../controllers/users')
const guard = require('../../../helpers/guard')
const upload = require('../../../helpers/upload')
const { validateUploadAvatar} = require('./validation')

router.post('/auth/register', validate.createUser, usersController.register)
router.post('/auth/login', usersController.login)
router.post('/auth/logout', guard, usersController.logout)
router.get('/current', guard, usersController.currentUser)

router.patch(
    '/avatars',
    [guard, upload.single('avatar'), validateUploadAvatar],
    usersController.avatars,
  )

module.exports = router
