const express = require('express');
const router = express.Router();

router.get('/login', (req, res) => {
    res.send('<html><body><form onsubmit="localStorage.setItem(`username`, document.getElementById(`username`).value)" action="/login" method="POST"><input type="text" name="username" id="username"></input><button type="submit">Login</button></body></html>')
})

router.post('/login', (req,res)=> {
    res.redirect('/')
})

module.exports = router;