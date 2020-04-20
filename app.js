const express = require('express')
const path = require('path')
const session = require('express-session')

// Models

const db = require('./utils/db')

const config = require('./config/index.js')

const route = require('./src/routes')
const logger = require('./config/logger')

const app = express()

// Parse the payload and add to request.body
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))

// Session trust first proxy

app.set('trust proxy', 1)
app.use(session({
  secret: 'payload',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))

// All route should be added to the index.js file inside the route folder
app.use('/', route)

app.set('view engine', 'ejs')

// Handle the error
app.listen(5001)

db.connect(config.dbUrl)

app.listen(config.port)

logger.log(`Listening @ port ${config.port}`)
