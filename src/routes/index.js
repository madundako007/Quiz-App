const express = require('express')
const questions = require('./questions')
const users = require ('./users')


const router = express.Router()
// All your parent route link should be in this file
// Create your route file in the routes folder and link your file here
/**
 * e.g const userRoute = require('./userRoute');
 *     router.use("/user", userRoute)
 */

router.use('/', questions)
router.use('/', users)


module.exports = router
