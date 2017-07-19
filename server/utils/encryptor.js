const bcrypt = require('bcrypt');

module.exports = {
    generateSalt() {
        return bcrypt.genSaltSync(10);
    },
    generateHashedPassword(password, salt) {
        return bcrypt.hashSync(password, salt);
    },
    validatePassword(password, hash) {
        return bcrypt.compareSync(password, hash);
    },
};
