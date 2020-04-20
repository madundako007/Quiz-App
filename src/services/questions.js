const questionsModel = require('./../models/questions')

const create = async data => await questionsModel.create(data)

const getQuestion = async data => await questionsModel.find()

const compute_result = async data => await questionsModel.findOne(data)

const webQuestionCreate = async data => await questionsModel.create(data)

const registerUser = async data => await questionsModel.create(data)

const login = async data => await questionsModel.findOne(data)

module.exports = {
create,
getQuestion,
compute_result,
webQuestionCreate,
registerUser,
login
}
