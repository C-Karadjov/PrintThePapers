const getController = (data) => {
    return {
        getHomePage(req, res) {
            // console.log(req.user.username);
            res.render('contentMain', { user: req.user });
        },
    };
};

module.exports = getController;
