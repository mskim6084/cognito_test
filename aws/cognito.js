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

function RegisterUser(username){
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
            return
        }
        //console.log("success in creating user!")
        cognitoUser = result.user
        let user_name = cognitoUser.getUsername()
        //console.log('username is '+ cognitoUser.getUsername());
    })
}

function confirmEmail(){
    console.log(userPool.getCurrentUser())
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
            console.log('access token + ' + result.getAccessToken().getJwtToken());
            console.log('id token + ' + result.getIdToken().getJwtToken());
            console.log('refresh token + ' + result.getRefreshToken().getToken());
            res.redirect('dashboard')
        },
        onFailure: function(err) {
            console.log(err);
            res.redirect('/')
        },
    });
}

module.exports = {RegisterUser, confirmEmail, Login}