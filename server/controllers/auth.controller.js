const passport = require('passport');

const getController = (data) => {
    return {
        getLoginPage(req, res) {
            res.render('users/login');
        },
        getRegisterPage(req, res) {
            res.render('users/register');
        },
        logout(req, res) {
            req.logout();
            res.redirect('/home');
        },
        register(req, res) {
            return data.users.userCreate(req.body.firstName, req.body.lastName,
                req.body.username, req.body.password,
                req.body.email, req.body.profilePicture)
                .then(() => {
                    passport.authenticate('local')(req, res, () => {
                        res.redirect('/home');
                    });
                })
                .catch((err) => {
                    res.status(400).send(err);
                    res.redirect('/register');
                });
        },
        login(req, res, next) {
            passport.authenticate('local', (error, user) => {
                if (error) {
                    next(error);
                    return res.status(500)
                        .json('Server error! Please try again!');
                }

                if (!user) {
                    return res.status(400)
                        .json('Invalid username or password!');
                }

                return req.login(user, (err) => {
                    if (err) {
                        next(err);
                        return res.status(500)
                            .json('Server error! Please try again!');
                    }
                    return res.status(200).json('Login successful!');
                });
            })(req, res, next);
        },
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
        getAdminPage(req, res) {
            if (!req.isAuthenticated() && req.user.role !== 'admin') {
                return res.redirect('/home');
            }
            return data.users.findAll()
                .then((usersData) => {
                    if (!usersData) {
                        return res.render('page-not-found',
                            { user: req.user });
                    }
                    return res.render('users/adminPanel', {
                        user: req.user,
                        usersData: usersData,
                    });
                })
                .catch((error) => {
                    console.log(error);
                    res.status(500)
                        .json('An error occurred! Please try again!');
                });
        },
        getUserById(req, res) {
            const id = req.params.id;
            return data.users.findById(id)
                .then((user) => {
                    if (!user) {
                        return res.render('page-not-found', { user: req.user });
                    }
                    return res.redirect('/profile/' + user.username);
                })
                .catch((error) => {
                    res.status(500)
                        .json('An error occurred! Please try again!');
                });
        },
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
    };
};

module.exports = getController;
