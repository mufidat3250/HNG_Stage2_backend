const express = require('express')
const router = express.Router()
const {createUser, getUsers, getUser} = require('../controller/user')

router.route('/').get(getUsers)
router.route('/:id').get(getUser)

module.exports = router