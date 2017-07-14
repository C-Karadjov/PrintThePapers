/* globals __dirname */

const fs = require('fs');
const path = require('path');

const init = (db) => {
    fs.readdirSync(__dirname)
        .filter((file) => file.includes('.data'))
        .forEach((file) => {
            const dataModulePath = path.join(__dirname, file);
            require(dataModulePath).getData(db);
        });
};

module.exports = { init };
