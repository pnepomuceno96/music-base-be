const express = require('express');
const bodyParser = require('body-parser')
const router = express.Router()
const userService = require('../service/userService')

router.use(bodyParser.json())

// Register Endpoint
router.post("", async (req, res) => {
    let {username, password} = req.body;
    let uid;
    userService.signUp(username, password).then((data) => {
        console.log(`Sign Up Data = ${data}`)
        uid = data.userSub

        const userDbResponse = userService.addUser(uid, username)

        if(!userDbResponse) {
            res.statusCode = 400;
            res.send({message: "Error adding user to db"})
            
        } else {
            res.send({
                message: "User registered successfully!",
                statusCode: 200,
                user_id: uid,
                username: data.user.username,
                user: data.user
            })
        }

    }).catch((err) => {
        res.statusCode = 400
        res.send({message: `Sign Up failed: ${err}`})
        
    })

    
})

// login endpoint
// POST {username, password}
router.post("/login", async (req, res) => {
    const {username, password} = req.body;

    const {success, result} = await userService.login(username, password);
    if(!success){
        return res.status(400).send({
            message: `Error logging in to Cognito: ${result}`
        });
    }
    const accessToken = result.accessToken;
    return res.status(200).send({
        message: "Successful login to Cognito",
        accessToken
    });
    
});

module.exports = router