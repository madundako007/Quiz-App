const express = require('express')
const questionsServices = require('./../services/questions')
const usersServices = require('./../services/users')

const create = async (req, res) => {
    const data = {
        question: req.body.question,
        option1: req.body.option1,
        option2: req.body.option2,
        option3: req.body.option3,
        option4: req.body.option4,
        answer: req.body.answer
    }
    try {
        if (!data.question) {
            return res.send({ error: 'Insert question' })
        }

        if (!data.option1) {
            return res.send({ error: 'Option can not be empty' })
        }

        if (!data.option2) {
            return res.send({ error: 'Option can not be empty' })
        }

        if (!data.option3) {
            return res.send({ error: 'Option can not be empty' })
        }

        if (!data.option4) {
            return res.send({ error: 'Option can not be empty' })
        }

        if (!data.answer) {
            return res.send({ error: 'Answer cannot be empty' })
        }

        await questionsServices.create(data)

        res.render("questions", { reply: "Question succesfully added " })

    } catch (error) {
        res.status(401).send({ error: 'Unable to post questions' })
    }
}

const getQuestion = async (req, res) => {
    
    const { email } = req.query;

    try {
        const result = await questionsServices.getQuestion({})
        res.render('create', { result, email })

    } catch (error) {
        res.status(401).send({ error: 'Unable to get questions' })
    }
}

const computeResult = async (req, res) => {
    const {email} = req.body
        let correctAnswer = 0
    let count = 0
    try {
        for (let id in req.body) {
            if (id === 'email') {
                continue
            }
            const data = { _id: id }

            count += 1

            const result = await questionsServices.compute_result(data)

            if (req.body[id] === result.answer) {
                correctAnswer += 1

            }
        }
        
        let resultdata = { email, correctAnswer, count }
        await usersServices.saveResult(resultdata)

        res.render('result', { correctAnswer, count, email });

    } catch (error) {
        res.status(401).send({ error: 'Unable to get answer' })
    }
}

const webQuestionCreate = async (req, res) => {
    res.render('questions', { reply: "" })
}


module.exports = {
    create,
    getQuestion,
    computeResult, 
    webQuestionCreate,

}
console.log('server started ')