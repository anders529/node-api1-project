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
server.delete('/api/users/:id', (req, res) => {
    const id = req.params.id;
    users.remove(id)
    .then(user => {
        if (user) {res.json(user);}
        else {res.status(404).json({message: 'The user with the specified ID does not exist.'});
        }
    })
    .catch(err => {res.status(500).json({error: 'The user could not be removed'});
    });
});
server.put('/api/users/:id', (req, res) => {
    const id = req.params.id;
    const changes = req.body;
    users.update(id, changes)
    .then(user => {
        if(!user) {res.status(404).json({message: 'The user with the specified ID does not exist.'});
        } else if (changes.name && changes.bio) {res.json(changes);}
          else {res.status(400).json({errorMessage: 'Please provide name and bio for the user.'});
        }
    })
    .catch(error => {
        res.status(500).json({error: 'The user information could not be modified.'});
    });
});
server.listen(port, () => {
    console.log(`server started at ${port}`)
})