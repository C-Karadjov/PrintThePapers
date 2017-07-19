const getController = (data) => {
    return {
        getHomePage(req, res) {
            res.render('homePage', { user: req.user });
        },
    };
};

module.exports = getController;
