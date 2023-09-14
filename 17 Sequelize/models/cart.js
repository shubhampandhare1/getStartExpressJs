const fs = require('fs');
const path = require('path');

const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'cart.json'
);

module.exports = class Cart {
    static addProduct(id, productPrice) {

        //fetch the previous cart
        fs.readFile(p, (err, fileContent) => {
            let cart = { product: [], totalPrice: 0 };
            if (!err) {
                cart = JSON.parse(fileContent)
            }

            //Analyze the cart => Find existing product
            const existingProductIndex = cart.product.findIndex(prod => prod.id === id);  
            const existingProduct = cart.product[existingProductIndex];    
            let updateProduct;

            //add new product or increase the quantity
            if (existingProduct) {
                updateProduct = { ...existingProduct };
                updateProduct.qty += 1;
                cart.product = [...cart.product];       //to copy the existing cart
                cart.product[existingProductIndex] = updateProduct;     //and replace the existing product with updatedProduct
            }

            else {
                updateProduct = { id: id, qty: 1 };
                cart.product = [...cart.product, updateProduct];
            }

            cart.totalPrice = cart.totalPrice + +productPrice; // extra '+' is to convert string to number
            fs.writeFile(p, JSON.stringify(cart), err => {
                console.log(err);
            })
        })
    }
}