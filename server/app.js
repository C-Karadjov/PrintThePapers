const express = require('express');

const app = express();

const config = require('./config');
const { connect } = require('./db');
const { init } = require('./data');

const async = () => {
    return Promise.resolve();
};

async()
    .then(()=>connect(config.connectionString))
    .then((db)=>{
    const data = init(db);
        require('./config/app.config').configApp(app, data);
        require('./config/passport.config').configPassport(app, data, db);
        require('./routers').attachRouters(app, data);
    });

module.exports = app;
