/* globals $ requester toastr */

(function() {
    $('#btn-login').on('click', () => {
        const username = $('#username-login').val().trim();
        const password = $('#password-login').val().trim();
        const body = {
            username: username,
            password: password,
        };
        requester.postJSON('/login', body)
            .then((res) => {
                toastr.success(res);
                setTimeout(() => {
                    window.location = '/';
                }, 1000);
            })
            .catch((err) => {
                toastr.error(err.responseText);
                $('#username-login').val();
                $('#password-login').val('');
            });
    });
    $('#btn-register').on('click', () => {
        const body = {
            firstName: $('#first-name-register').val().trim(),
            lastName: $('#last-name-register').val().trim(),
            username: $('#username-register').val().trim(),
            password: $('#password-register').val().trim(),
            reenterPassword: $('#reenter-password-register').val().trim(),
            email: $('#email-register').val().trim(),
            avatar: $('#avatar-register').val().trim(),
        };

        if (Object.keys(body).length === 0) {
            toastr.error('Please fill out all of the fields!');
            return;
        }

        for (const prop in body) {
            if (!body[prop].trim() && prop !== 'avatar') {
                toastr.error('Please fill out all of the fields!' +
                    ' Only the avatar is optional!');
                return;
            }
        }
        const nameRegex = /^[a-zA-Z]/;
        if (!nameRegex.test(body.firstName)) {
            toastr.error('First name can contains ' +
                'only small or capital letters!');
            $('#first-name-register').val('').focus();
            return;
        }

        if (body.firstName.length < 2 || body.firstName.length > 18) {
            toastr.error('First name cannot be smaller ' +
                'than 2 symbols or greater than 18!');
            $('#first-name-register').val('').focus();
            return;
        }

        if (!nameRegex.test(body.lastName)) {
            toastr.error('Last name can contains ' +
                'only small or capital letters!');
            $('#last-name-register').val('').focus();
            return;
        }

        if (body.lastName.length < 2 || body.lastName.length > 18) {
            toastr.error('Last name cannot be smaller ' +
                'than 2 symbols or greater than 18!');
            $('#last-name-register').val('').focus();
            return;
        }

        const userNameRegChecker = new RegExp('/[a-z|A-z|0-9|_|\.]/g');
        if (userNameRegChecker.test(body.username)) {
            toastr.error('Invalid username symbols!');
            $('#username-register').val('').focus();
            return;
        }

        if (body.username.length < 2 || body.username.length > 18) {
            toastr.error('Username cannot be smaller ' +
                'than 2 symbols or greater than 18!');
            $('#username-register').val('').focus();
            return;
        }

        const passwordRegChecker = new RegExp('/[a-z|A-z|0-9]/g');
        if (passwordRegChecker.test(body.password)) {
            toastr.error('Invalid password symbol!');
            $('#password-register').val('').focus();
            return;
        }

        if (!body.password || body.password !== body.reenterPassword) {
            toastr.error('Passwords do not match!');
            $('#password-register').val('').focus();
            $('#reenter-password-register').val('');
            return;
        }

        if (body.password.length < 6 || body.password.length > 18) {
            toastr.error('Password should be between 6 and 18 symbols!');
            $('#password-register').val('').focus();
            $('#reenter-password-register').val('');
            return;
        }

        // eslint-disable-next-line
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!emailRegex.test(body.email)) {
            toastr.error('Invalid E-Mail!');
            $('#email-register').val('').focus();
            return;
        }

        requester.postJSON('/register', body)
            .then((res) => {
                console.log(res);
                toastr.success('Registration successful! Redirecting...');
                setTimeout(() => {
                    window.location = '/';
                }, 1500);
            })
            .catch((err) => {
                console.log(err);
                toastr.error('An error occurred! Please try again!');
            });
    });
}());
