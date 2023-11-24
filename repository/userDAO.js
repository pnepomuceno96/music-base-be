const AWS = require('aws-sdk');

AWS.config.update({
    region: 'us-east-2'
})

const docClient = new AWS.DynamoDB.DocumentClient();

const TABLENAME = 'musicbaseusers'

function addUser(user_id, username) {
    const params = {
        TableName: TABLENAME,
        ConditionExpression: 'attribute_not_exists(user_id)',
        Item: {
            user_id,
            username,
            favorites: [],
            ratings: [],
            lists: [],
            bio: ''
        }
    }
    if (!docClient) {
        console.error('docClient is not initialized yet');
        return Promise.reject(new Error('docClient is not initialized'));
    }
    return docClient.put(params).promise();
}


module.exports = {addUser}