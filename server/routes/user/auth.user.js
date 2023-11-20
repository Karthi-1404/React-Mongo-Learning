const router = require('express').Router()
const Authmiddleware = require('../../middleware/Auth.middleware')

const registerComponent = require('../../components/user/register')
const signinComponent = require('../../components/user/login')
const currentUserComponent = require('../../components/user/current-user')


router.post('/register',registerComponent)
router.post('/signin',signinComponent)
router.get('/currentuser',Authmiddleware, currentUserComponent)


module.exports = router