const usersModel = require('./../models/users')
const questionsModel = require('./../models/questions')

const registerUser = async data => await usersModel.create(data)

const login = async data => await usersModel.findOne(data)

const registerForm = async data => await questionsModel.create(data)

const loginForm = async data => await questionsModel.create(data)

const getResultForm = async data => await questionsModel.create(data)

const getResult = async data => await questionsModel.find(data)

const homepage = async data => await usersModel.create(data)

const saveResult = async data => await usersModel.create(data)



module.exports = {
registerUser,
login,
registerForm,
loginForm, 
getResultForm,
getResult,
homepage,
saveResult
}
