const bcrypt = require('bcrypt')
const usersServices = require('./../services/users')
const session = require('express-session')

const saltRounds = 10
const registerUser = async (req, res) => {
  let data = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: req.body.password,
    phone: req.body.phone,
    email: req.body.email

  }
  try {
    if (!data.firstName) {
      return res.send({ error: 'first name cannot be empty' })
    }

    if (!data.lastName) {
      return res.send({ error: 'Last name cannot be empty' })
    }

    if (!data.password || data.password.length < 5) {
      return res.send({ error: 'Password must be over 5 characters' })
    }

    if (!data.phone || data.phone.length > 16) {
      return res.send({ error: 'Phone number cannot be over 15 numbers ' })
    }

    if (!data.email || data.email.search('@') === -1) {
      return res.send({ error: 'Enter a valid Email address ' })
    }


    const salt = await bcrypt.genSalt(saltRounds)
    const hash = await bcrypt.hash(data.password, salt)

    data.password = hash

    res.redirect('/login')

    await usersServices.registerUser(data)

  } catch (error) {
    console.log(error)
    res.status(500).send({ error: 'Unable to register' })
  }
}

const login = async (req, res) => {
  const data = {
    email: req.body.email,
    password: req.body.password
  }

  try {
    const result = await usersServices.login({ email: data.email })

    if (!result) {
      return res.render('login', { error: 'Invalid email or password' })

    }

    // const verifiedPassword = await bcrypt.compare(req.body.password, result.password)
    // console.error(error)
    // if (!verifiedPassword) {
    //   return res.render('login', { error: 'Error attepmting to verified' })
    // }

    req.session.user = data;
    req.session.save(
      () => {
        res.redirect('questions/?email=' + data.email)
      }
    )

  } catch (error) {
    console.error(error)

    return res.status(500).send({ error: 'Error occurred when logging in' })
  }
}

const registerForm = (req, res) => {
  res.render('register', { result: "" })
}

const loginForm = (req, res) => {
  res.render('login', { error: "" })
}

const getResultForm = async (req, res) => {
  const result = await  usersServices.getResult(data)
  res.render('resultForm', { response: "" })
}

const getResult = async (req, res) => {
  let data = {
    email: req.body.email
  }
  try {
    const result = await usersServices.getResult(data)

    if (!result) {
      return res.status(404).send({ error: 'email address not found' })

    }

    res.render('resultForm', { response: 'You successfully fetch result' })


  } catch (error) {
    console.error(error)
    res.status(401).send({ error: 'Error fetching user' })
  }
}

const homepage = (req, res) => {
  res.render('homepage')
}

const logout = (req, res) => {

  req.session.user = null
  req.session.save(() => {
    res.redirect('/login')
  })
}

debugger;



module.exports = {
  registerUser,
  login,
  registerForm,
  loginForm,
  getResultForm,
  getResult,
  homepage,
  logout
}







