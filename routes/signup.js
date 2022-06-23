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
    console.log(req)
    let confirmation_code = req.body.confirmation_code
    aws_cognito.confirmEmail()
})

module.exports = router