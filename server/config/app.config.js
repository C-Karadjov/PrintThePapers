/* globals __dirname */

const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const morgan = require('morgan');

const configApp = (app) => {
    app.set('view engine', 'pug');

    app.use(bodyParser.json());

    app.use(bodyParser.urlencoded({ extended: true }));
    
    app.use(flash());
    
    app.use('/libs',
        express.static(
            path.join(__dirname, '../../node_modules')
        ));
    app.use('/public', express.static('public'));
    
    // app.use(morgan('combined'));
};

module.exports = { configApp };
