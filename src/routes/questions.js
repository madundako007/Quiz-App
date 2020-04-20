const express = require('express')
const authenticate = require('./../authenticate/authenticate')
const router = express.Router()
const questionsControllers = require('./../controllers/questions')



router.get('/questions', authenticate, questionsControllers.getQuestion)
router.get('/createQuestions', authenticate, questionsControllers.webQuestionCreate)

router.post('/compute_result', authenticate, questionsControllers.computeResult)
router.post('/questions', authenticate, questionsControllers.create)



module.exports = router
