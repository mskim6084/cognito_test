const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const aws_cognito = require('../aws/cognito')

const urlencodedParser = bodyParser.urlencoded({extended: false})

router.get('/', (req,res) => {
    res.render('signup')
})

router.post('/', urlencodedParser,(req,res) => {
    console.log(req.body)
    const register = aws_cognito.RegisterUser()
    console.log(register)
})

module.exports = router