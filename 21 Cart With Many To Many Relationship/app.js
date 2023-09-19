const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');

const sequelize = require('./util/database');

const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    User.findByPk(1)
        .then((user) => {
            req.user = user;
            next();
        })
        .catch(err => console.log(err))
})

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' }); //onDelete:'CASCADE' will delete the prducts related to User if User is deleted
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem }); //'through' tells sequelize that 
Product.belongsToMany(Cart, { through: CartItem }); //where these connections should be stored

sequelize
    // .sync({ force: true })     // Syncs models to the database by creating the appropriate tables and/relations
    // This creates the table if it doesn't exist (and does nothing if it already exists)
    .sync()
    .then((result) => {
        // console.log(result)
        return User.findByPk(1)
    })
    .then((user) => {
        if (!user) {
            return User.create({ name: 'Shubham', email: 'shubham@mail.com' })
        }
        return user;
    })
    .then(user => {
        return user.createCart()
    })
    .then(cart=>{
        app.listen(3000);
    })

    .catch(err => console.log(err))

