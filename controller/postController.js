const postService = require('../service/postService')
const express = require('express')
const bodyParser = require('body-parser')
const router = express.Router()

router.use(bodyParser.json())

router.post("", async (req, res) => {
    let {user_id, body, mbid} = req.body;
    postService.addPost(user_id, body, mbid).then((data) => {
        console.log("adding post" + data)
        res.statusCode = 200;
        res.send({
            message: `Successfully added post`
        })
    }).catch((err) => {
        res.statusCode = 400;
        res.send({
            message: `Post creation error: ${err}`
        })
    })
})

router.get('', async (req, res) => {
    postService.getAllPostsPastWeek()
    .then((data) => {
        res.send({body: data.Items})
    }).catch((err) => {
        res.statusCode = 400
        res.send({message: `Error: ${err}`})
    })
})

router.get('/:user_id', async (req, res) => {
    const id = req.params.user_id
    console.log(`id: ${id}`)

    postService.getPostsByUserId(id)
    .then((data) => {
        res.send({body: data.Items})
    }).catch((err) => {
        res.statusCode = 400
        res.send({message: `Error: ${err}`})
    })
}) 

router.delete('/:post_id', async (req, res) => {
    const {user_id} = req.body; // Temporary line
    const post_id = req.params.post_id
    postService.deletePostById(user_id, post_id)
    .then((data) => {
        res.send({message: `Successfully deleted post ${data}`})
    }).catch((err) => {
        res.statusCode = 400
        res.send({message: `Error: ${err}`})
    })
})
module.exports = router