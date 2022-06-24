const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const aws_cognito = require('../aws/cognito')
const url = require('url')
let username = "";
const urlencodedParser = bodyParser.urlencoded({extended: false})

router.get('/', (req,res) => {
    res.render('signup')
})

router.post('/', urlencodedParser, (req,res) => {
    console.log(req.body)
    let user_name = req.body.username
    username = req.body.username
    aws_cognito.RegisterUser(user_name,res)
})

router.get('/verify', isUsernameSet,(req,res) => {
    res.render('verify')
})

router.post('/verify', urlencodedParser, isUsernameSet,(req,res) => {
    let confirmation_code = req.body.confirmation_code
    console.log(username, confirmation_code)
    aws_cognito.confirmEmail(username, confirmation_code,res)
    username = ""
})

function isUsernameSet (req, res, next){
    if (username === ""){
        res.redirect('/')
        return
    }
    next()
}



module.exports = router