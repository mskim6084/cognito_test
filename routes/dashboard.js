const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const aws_cognito = require('../aws/cognito')

const urlencodedParser = bodyParser.urlencoded({extended: false})

router.get('/', urlencodedParser,(req,res) => {
    res.render('dashboard')
    
})

module.exports = router