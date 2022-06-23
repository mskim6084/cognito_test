const express = require('express')
const bodyParser = require('body-parser')
const aws_cognito = require('./aws/cognito')
const app = express()

app.use(express.static("public"))
const urlencodedParser = bodyParser.urlencoded({extended: false})

app.set('view engine', 'ejs')
app.get('/', (req,res) => {
    res.render("login")
})

app.post('/',urlencodedParser, (req,res) => {
    aws_cognito.Login(req.body.username, req.body.password,res)
})

const signupRouter = require('./routes/signup')
const dashboardRouter = require('./routes/dashboard')

app.use('/signup',signupRouter)
app.use('/dashboard',dashboardRouter)

app.listen(3000)