const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const aws_cognito = require('../aws/cognito')
const url = require('url')

const urlencodedParser = bodyParser.urlencoded({extended: false})

router.get('/', (req,res) => {
    res.render('signup')
})

router.post('/', urlencodedParser, (req,res) => {
    console.log(req.body)
    let user_name = req.body.username
    aws_cognito.RegisterUser(user_name)
    res.redirect(url.format({
        pathname: '/signup/verifyemail',
        query: {
            "user_name":user_name
        }
    }))
})

router.get('/verifyemail', (req,res) => {
    res.render('verifyemail')
})

router.post('/verifyemail', urlencodedParser, (req,res) => {
    let confirmation_code = req.body.confirmation_code
    let username = req.body.username
    aws_cognito.confirmEmail(username, confirmation_code,res)
    //res.render('login')
})

module.exports = router