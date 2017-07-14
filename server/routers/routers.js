/* globals __dirname */

const path = require('path');
const fs = require('fs');

const attachRouters = (app, data) => {
    fs.readdirSync(__dirname)
        .filter((file) => file.includes('.router'))
        .forEach((file) => {
            const modulePath = path.join(__dirname, file);
            require(modulePath).attachTo(app, data);
        });
};

module.exports = { attachRouters };
