const express = require('express');
const router = express.Router();
const fs = require('fs');
router.get('/', (req, res) => {
    fs.readFile('chats.txt', (err, data) => {
        if (err) {
            data = "No Chats";
            console.log(err)
        }
        res.send(`${data}<html><head><title>Group Chat App</title></head><body><form action="/" method="POST" onsubmit="document.getElementById('username').value = localStorage.getItem('username') "><input id="message" type="text" name="message"></input><input type="hidden" id="username" name="username"></input><button type="submit">Send</button></form></body>`);
    })
})

router.post('/', (req, res) => {
    fs.writeFile('chats.txt', `${req.body.username}:${req.body.message}`, { flag: 'a' }, (err) => {
        err ? console.log(err) : res.redirect('/');
    })
})

module.exports = router;