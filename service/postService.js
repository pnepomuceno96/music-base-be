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

async function deletePostById(id) {

}

module.exports = {
    addPost, getPostsByUserId, deletePostById
}