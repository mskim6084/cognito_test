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

router.post('/', urlencodedParser, async (req,res) => {
    try{
        console.log(req.body)
        let user_name = req.body.username
        username = req.body.username
        let value = await aws_cognito.RegisterUser(user_name)
        console.log(value)
        res.redirect('/signup/verify')
    } catch(error){
        console.log(error)
        res.redirect('/signup')
    }
})

router.get('/verify', isUsernameSet,(req,res) => {
    res.render('verify')
})

router.post('/verify', urlencodedParser, isUsernameSet,async (req,res) => {
    try{
        let confirmation_code = req.body.confirmation_code
        console.log(username, confirmation_code)
        let value = await aws_cognito.confirmEmail(username, confirmation_code)
        console.log(value)
        username = ""
        res.redirect('/')
    } catch(error){
        console.log(error)
        res.redirect('/signup/verify')
    }
})

function isUsernameSet (req, res, next){
    if (username === ""){
        res.redirect('/')
        return
    }
    next()
}



module.exports = router