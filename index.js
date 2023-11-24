const express = require('express');
const app = express();
const port = 5500;
const cors = require('cors');
const bodyParser = require('body-parser')

const userRouter = require('./controller/userController')
const postRouter = require('./controller/postController')

app.use(cors())
app.use(bodyParser.json())

app.get('/api', (req, res) => {
    res.send("Welcome to the MusicBase API!")
})

app.use('/api/users', userRouter);
app.use('/api/posts', postRouter)

app.listen(port, () => {
    console.log("Listening on port ", port)
})