const express = require('express')
const bodyParser = require('body-parser')
const aws_cognito = require('./aws/cognito')
const app = express()
const session = require('express-session')
const flash = require('connect-flash')

app.use(session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false
    }   
))
app.use(flash())
app.use(express.static("public"))
const urlencodedParser = bodyParser.urlencoded({extended: false})

app.set('view engine', 'ejs')
app.get('/', aws_cognito.isAuthenticated ,(req,res) => {
    res.render('login', {
        message: req.flash('message')
    })
})

app.post('/',urlencodedParser, async (req,res) => {
    try{
        let value = await aws_cognito.Login(req.body.username, req.body.password)
        console.log(value)
        req.flash('message',value)
        res.redirect('/dashboard')
    }catch(error){
        console.log(error)
        req.flash('message',error)
        res.redirect('/')
    }
})

const signupRouter = require('./routes/signup')
const dashboardRouter = require('./routes/dashboard')

app.use('/signup',signupRouter)
app.use('/dashboard',dashboardRouter)

app.listen(process.env.PORT || 3000)