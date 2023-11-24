const AWS = require('aws-sdk')
const CognitoIdentityServiceProvider = AWS.CognitoIdentityServiceProvider;
const AmazonCognitoIdentity = require('amazon-cognito-identity-js')

AWS.config.update({region: 'us-east-2'})

const poolData = {
    UserPoolId: 'us-east-2_IJkQHUZHB',
    ClientId: '4sqllmuaro1cdc0dojmo2ahgcj'
}

const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData)

var client = new CognitoIdentityServiceProvider({
    apiVersion: '2016-04-19',
    region: 'us-east-2'
});

async function signUp (username, password) {
    const attributeList = [
        new AmazonCognitoIdentity.CognitoUserAttribute({
            Name: "email",
            Value: null
        }),
    ];
    console.log(`signing up ${username}`)
    return new Promise((resolve, reject) => {
        userPool.signUp(username, password, attributeList, null, (err, result) => {
            if (!err) {
                resolve(result)
            } else {
                console.log('sign up error:', err)
                reject(err)
            }
        })
    })
}

async function login(username, password) {
    const authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
        Username: username,
        Password: password
    });

    const userData = {
        Username: username,
        Pool: userPool
    };

    const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

    return new Promise((resolve, reject) => {
        cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: (result) => {
                resolve(result);
            },
            onFailure: (err) => {
                console.error("Login error:", err)
                reject(err);
            }
        });
    });
}

module.exports = {signUp, login}