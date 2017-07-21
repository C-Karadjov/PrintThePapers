const { ObjectID } = require('mongodb');

const getData = (db) => {
    const productsCollection = db.collection('products');
    return {
        createProduct(title, description, img, price, size,
                      width, height, productionTime, addPDF) {
            const product = {
                title,
                description,
                img,
                price,
                size,
                width,
                height,
                productionTime,
                addPDF,
            };
            return productsCollection.insertOne(product)
                .then((result) => {
                    return result;
                });
        },
        findAll() {
            return productsCollection.find();
        },
        findById(id) {
            return productsCollection.findOne(
                {
                    _id: new ObjectID(id),
                }
            )
                .then((product) => {
                    if (!product) {
                        return null;
                    }
                    product.id = product._id;
                    return product;
                });
        },
    };
};

module.exports = { getData };
