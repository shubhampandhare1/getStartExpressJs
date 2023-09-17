const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');
const sequelize = require('./util/database')

const app = express();

const userRoutes = require('./routes/user')

app.use(bodyParser.json({ extended: false }))
app.use(cors());

app.use('/user', userRoutes);

sequelize.sync()
    .then(() => {
        app.listen(3000);
    })
    .catch(err => console.log('Error inside sequelize sync', err));