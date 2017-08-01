const getController = (data) => {
    return {
        getAllProducts(req, res) {
            console.log('----------------\n');
            const pathWithName = 'products' + req.route.path;
            console.log(pathWithName);
            res.render(pathWithName, { user: req.user });
        },
    };
};

module.exports = getController;
