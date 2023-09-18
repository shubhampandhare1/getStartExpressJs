const express = require('express');
const sequelize = require('./util/database')
const cors = require('cors');
const bodyParser = require('body-parser');
const expenseRoutes = require('./routes/expenseRoutes')
const app = express();
app.use(bodyParser.json({ extended: false }));
app.use(cors());

app.use('/expense', expenseRoutes);

sequelize.sync()
    .then(() => {
        app.listen(4000)
    }).catch(err => console.log('error at sequelize sync'));