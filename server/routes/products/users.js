const router = require('express').Router()
const Authmiddleware = require('../../middleware/Auth.middleware')
const getallusersComponent = require('../../components/user/all-users')
const updateUserComponent = require('../../components/user/edit.user')


router.get('/get-users',Authmiddleware,getallusersComponent)
router.put('/update-user/:id',Authmiddleware, updateUserComponent)

module.exports = router