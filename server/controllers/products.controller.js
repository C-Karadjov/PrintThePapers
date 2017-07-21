const getController = (data)=> {
    return {
        getAllProducts(req, res) {
            res.render('products/products', { user: req.user });
        },
    };
};

module.exports = getController;
