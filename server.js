const express = require('express')
const server = express()
const users = require('./users.js')
const port = 5000;
server.use(express.json())

server.get('/', (req, res) => {
    res.json({message: 'Hello World!'})
})
server.get('/api/users', (req, res) => {
    res.json(users)
})
server.get('/api/users/:id', (req, res) => {
    const id = req.params.id
    const user = users.find(u => u.id == id)
    if (user) {
        res.json(user)
    } else {res.status(404).json({message: 'User with specified ID does not exist'})}
})
server.post('/api/users', (req, res) => {
    const newUser = {
        id: users.length +1,
        name: req.body.name,
        bio: req.body.bio
    }
    users.push(newUser)
    res.status(201).json(newUser)
})
server.put('/api/users/:id', (req, res) => {
    const index = users.findIndex(u => u.id == req.params.id)
})
server.listen(port, () => {
    console.log(`server started at ${port}`)
})