const postDAO = require('../repository/postDAO')
const uuid = require('uuid')

async function addPost(user_id, body, mbid) {
    return new Promise((resolve, reject) => {
        postDAO.addPost(user_id, uuid.v4(), body, mbid).then((data) => {
            resolve(data)
        }).catch((err) => {
            reject (err)})
    })   
}

async function getPostsByUserId(user_id) {
    console.log(`user_id = ${user_id}`)
    return new Promise((resolve, reject) => {
        postDAO.getPostsByUserId(user_id)
            .then((data) => {
                console.log("promise successfully resolved")
                resolve(data)
            })
            .catch((err) => {
                reject(err)
            })
    })
}

async function deletePostById(user_id, post_id) {
    // try {
    //     const result = await postDAO.deletePostById(id);
    //     console.log("post deleted", result);
    //     if(result.Attributes.post_id !== post_id) {return false};
    //     return true
    // } catch (error) {
    //     console.error("Post deletion error: " + error)
    //     return false;
    // }
    return new Promise((resolve, rej) => {
        postDAO.deletePostById(user_id, post_id).then((data) => {
            console.log("Promise successfully resolved")
            resolve(data)
        })
        .catch((err) => {
            console.log("Promise rejected")
            rej(err)
        })
    })
}

module.exports = {
    addPost, getPostsByUserId, deletePostById
}