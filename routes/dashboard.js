const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const aws_cognito = require('../aws/cognito')

const urlencodedParser = bodyParser.urlencoded({extended: false})

router.get('/', urlencodedParser, aws_cognito.isNotAuthenticated,(req,res) => {
    res.render('dashboard',{
        message: req.flash('message')
    })

})

router.post('/',urlencodedParser, aws_cognito.isNotAuthenticated,(req,res) => {
    aws_cognito.signOutUser(res)
})

module.exports = router