const express = require('express')
const router = express.Router()
const {createOrganization, createOrganizationByUser, getOrganizations, getOrganization}  = require('../controller/organization')
const userExtractor = require('../middlewares/userExtractor')

router.get('/', userExtractor, getOrganizations)
router.get('/:orgId', userExtractor, getOrganization)
router.post('/', userExtractor, createOrganization)
router.post('/:orgId/users', createOrganizationByUser)

module.exports = router