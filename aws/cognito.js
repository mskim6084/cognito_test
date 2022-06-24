const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
const CognitoUserPool = AmazonCognitoIdentity.CognitoUserPool;
const AWS = require('aws-sdk');
const request = require('request');
const jwkToPem = require('jwk-to-pem');
const jwt = require('jsonwebtoken');
require("dotenv").config()

const poolData = {
    UserPoolId: process.env.COGNITO_USERPOOLID,
    ClientId: process.env.COGNITO_CLIENTID
}

const pool_region = "us-east-2";

const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData)

function RegisterUser(username,res){
    var attributeList = [];
    attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"email",Value:"andy.kim37@hotmail.com"}));
    /*
    var attributeList = [];
    attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"name",Value:"Prasad Jayashanka"}));
    attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"preferred_username",Value:"jay"}));
    attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"gender",Value:"male"}));
    attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"birthdate",Value:"1991-06-21"}));
    attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"address",Value:"CMB"}));
    attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"email",Value:"sampleEmail@gmail.com"}));
    attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"phone_number",Value:"+5412614324321"}));
    attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"custom:scope",Value:"admin"}));
    */
    userPool.signUp(username, 'SamplePassword123!',attributeList,null,function(err, result){
        if (err){
            console.log(err)
            res.redirect('/signup')
            return
        }
        //console.log("success in creating user!")
        cognitoUser = result.user
        res.redirect('/signup/verify')
        //console.log('username is '+ cognitoUser.getUsername());
    })
}

function resendConfirmationCode(cognitoUser){
    cognitoUser.resendConfirmationCode(function(err, result){
        if (err){
            console.log(err.message)
        }
        console.log(result)
    })
}

function confirmEmail(username, confirmation_code,res){
    let userData = {
        Username: username,
        Pool: userPool
    }
    let cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData)
    cognitoUser.confirmRegistration(confirmation_code, true, function(err, result){
        if (err){
            console.log(err.message)
            res.redirect('/signup/verify')
            resendConfirmationCode(cognitoUser)
            return
        }
        console.log(result)
        res.redirect('/')
    })

}

async function Login(username,password,res){
    var authDetails = new AmazonCognitoIdentity.AuthenticationDetails({
        Username: username,
        Password: password
    })

    var userData = {
        Username : username,
        Pool : userPool
    };

    var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    cognitoUser.authenticateUser(authDetails, {
        onSuccess: function (result) {
            //console.log('access token + ' + result.getAccessToken().getJwtToken());
            //console.log('id token + ' + result.getIdToken().getJwtToken());
            //console.log('refresh token + ' + result.getRefreshToken().getToken());
            res.redirect('/dashboard')
        },
        onFailure: function(err) {
            console.log(err);
            res.redirect('/')
        },
    });
}

function getCurrUser(){
    return userPool.getCurrentUser()
}


function signOutUser(res){
    let currUser = userPool.getCurrentUser()
    if (currUser !== null){
        currUser.signOut()
        res.redirect('/')
    }
    else{
        console.log("No one is signed in")
    }
}

//Middleware for the products
function isAuthenticated(req,res,next){
    const currUser = getCurrUser()
    if (currUser !== null){
        res.redirect('/dashboard')
        return
    }
    next()
}

function isNotAuthenticated(req,res,next){
    const currUser = getCurrUser()
    if (currUser === null){
        res.redirect('/')
        return
    }
    next()
}

module.exports = {RegisterUser, confirmEmail, Login, getCurrUser, signOutUser, isAuthenticated,isNotAuthenticated}