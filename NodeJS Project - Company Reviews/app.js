const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const reviewsRoutes = require('./routes/reviewRoutes');
const sequelize = require('./util/databse');
const app = express();
app.use(bodyParser.json({ extended: false }));
app.use(cors());

app.use('/admin', reviewsRoutes)

sequelize.sync()
    .then((response) => {
        console.log('Sequelize running at port 3000');
        app.listen(3000);
    })
    .catch(err => console.log('Error at sequelize', err));