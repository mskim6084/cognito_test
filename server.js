const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.use(express.static("public"))
const urlencodedParser = bodyParser.urlencoded({extended: false})

app.set('view engine', 'ejs')
app.get('/', (req,res) => {
    res.render("login")
})

const signupRouter = require('./routes/signup')
const dashboardRouter = require('./routes/dashboard')

app.use('/signup',signupRouter)
app.use('/dashboard',dashboardRouter)

app.listen(3000)