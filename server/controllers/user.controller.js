const getController = (data) => {
    return {
        getMyProfile(req, res) {
            if (req.isAuthenticated()) {
                res.render('users/profile', { user: req.user });
                return;
            }
            res.render('users/login', { user: req.user });
        },
        getProfilePage(req, res) {
            const username = req.params.username;
            return data.users.findBy({ username: username })
                .then((userData) => {
                    if (!userData) {
                        return res.render('page-not-found', { user: req.user });
                    }
                    return res.render('users/profile', {
                        user: req.user,
                        userData: userData,
                    });
                })
                .catch((error) => {
                    console.log(error);
                    res.status(500)
                        .json('An error occurred! Please try again!');
                });
        },
        // getAdminPage(req, res) {
        //     if (!req.isAuthenticated() && req.user.role !== 'admin') {
        //         return res.render('not-authorized-page', { user: req.user });
        //     }
        //
        //     const page = +req.query.page || 1;
        //     let totalPagesCount;
        //     const pageSize = 10;
        //
        //     return data.users.findByPage(page)
        //         .then((usersData) => {
        //             totalPagesCount = Math.ceil(usersData.count / pageSize);
        //             res.render('users/adminPanel',
        //                 {
        //                     usersData: usersData.users,
        //                     page,
        //                     totalPagesCount,
        //                     user: req.user,
        //                 });
        //         })
        //         .catch((error) => {
        //             res.status(500)
        //                 .send(error);
        //         });
        // },
        // getUserById(req, res) {
        //     const id = req.params.id;
        //     return data.users.findById(id)
        //         .then((user) => {
        //             if (!user) {
        //                 return res.render('page-not-found', { user: req.user });
        //             }
        //             return res.redirect('/profile/' + user.username);
        //         })
        //         .catch((error) => {
        //             res.status(500)
        //                 .json('An error occurred! Please try again!');
        //         });
        // },
        createAdmin(req, res) {
            if (!req.isAuthenticated() || req.user.role !== 'admin') {
                res.render('not-authorized-page', { user: req.user });
            }
            const targetUser = {
                username: req.params.username,
            };

            const newData = { role: 'admin' };

            return data.users.updateUser(targetUser, newData)
                .then(() => {
                    res.redirect('/admin-panel');
                })
                .catch((err) => {
                    console.log(err);
                    res.render('not-authorized-page', { user: req.user });
                });
        },
        deleteUser(req, res) {
            if (!req.isAuthenticated() || req.user.role !== 'admin') {
                res.render('not-authorized-page', { user: req.user });
            }
            const userForDelete = {
                username: req.params.username,
            };
            return data.users.removeUser(userForDelete)
                .then(() => {
                    res.redirect('/admin-panel');
                })
                .catch((err) => {
                    console.log(err);
                    res.render('not-authorized-page', { user: req.user });
                });
        },
    };
};

module.exports = getController;
