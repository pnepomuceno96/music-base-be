const AWS = require('aws-sdk');

AWS.config.update({
    region: 'us-east-2'
})

const docClient = new AWS.DynamoDB.DocumentClient();

const TABLENAME = 'musicbaseposts'

// Post can be added and optionally be associated with a MusicBrainz release group id
function addPost(user_id, post_id, body, mbid) {
    const params = {
        TableName: TABLENAME,
        Item: {
            user_id,
            post_id,
            body,
            mbid
        }
    }
    if (!docClient) {
        console.error('docClient is not initialized yet');
        return Promise.reject(new Error('docClient is not initialized'));
    }
    return docClient.put(params).promise();
}

function getPostsByUserId(user_id) {
    const params = {
        TableName: TABLENAME,
        IndexName : 'user_id-index',
        KeyConditionExpression: '#u = :value',
        ExpressionAttributeValues: {
            ':value': user_id
        },
        ExpressionAttributeNames: {
            '#u': 'user_id'
        }
    };
    return docClient.query(params).promise();
}

function deletePostById(user_id, post_id) {
    console.log(`post_id = ${post_id}`)
    const params = {
        TableName: TABLENAME,
        IndexName: 'user_id-post_id-index',
        Key: {
            'user_id': user_id,
            'post_id': post_id
        }
        
    }
    return docClient.delete(params).promise();
}

module.exports = {
    addPost, getPostsByUserId, deletePostById
}