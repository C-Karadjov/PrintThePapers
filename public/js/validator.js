// eslint-disable-next-line
const VALIDATOR = (() => {
    const userNameRegChecker = new RegExp('/[a-z|A-z|0-9|_|\.]/g');
    const passwordRegChecker = new RegExp('/[a-z|A-z|0-9]/g');
    return {
        userNameRegChecker,

        passwordRegChecker,

        validateTypeIsString(username, stringName) {
            if (typeof username !== 'string') {
                throw new Error(`Invalid ${stringName} type`);
            }
        },

        validateStringLength(string, min, max, stringName) {
            if (string.length < min && string.length > max) {
                throw new Error(`Invalid ${stringName} length.`);
            }
        },

        validateWhatStringCanContain(username, regex) {
            if (regex.test(username)) {
                throw new Error('Invalid username symbols!');
            }
        },
    };
})();
