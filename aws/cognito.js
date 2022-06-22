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

function RegisterUser(){
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
    let user;

    userPool.signUp('andy.kim37', 'SamplePassword123!',attributeList,null,function(err, result){
        if (err){
            console.log(err)
            return
        }
        console.log("success in creating user!")
        cognitoUser = result.user
        user = result.user
        console.log('username is '+ cognitoUser.getUsername());
    })
    return user
}

module.exports = {RegisterUser}