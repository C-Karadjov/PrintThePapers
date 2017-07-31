const getController = (data) => {
    return {
        getHomePage(req, res) {
            res.render('index', { user: req.user });
        },
    };
};

module.exports = getController;
