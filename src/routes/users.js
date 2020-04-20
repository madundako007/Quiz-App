const express = require('express')
const authenticate = require('./../authenticate/authenticate')
const router = express.Router()
const usersControllers = require('./../controllers/users')

router.get('/homepage', usersControllers.homepage)

router.post('/register', usersControllers.registerUser)


router.get('/register', usersControllers.registerForm)

router.get('/login', usersControllers.loginForm)

router.post('/login', usersControllers.login)

router.get('/logout', usersControllers.logout)

router.get('/getResult', authenticate, usersControllers.getResultForm)

router.get('/getResult', authenticate, usersControllers.getResult)



module.exports = router
