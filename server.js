const express = require('express')
const app = express()

app.set('view engine', 'ejs')
app.get('/', (req,res) => {
    res.render("login")
})

const signupRouter = require('./routes/signup')

app.use('/signup',signupRouter)

app.listen(3000)