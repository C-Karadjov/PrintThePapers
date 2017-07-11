const express = require('express');

const app = express();

const config = require('./config');
const data = require('./data');

require('./config/db.config')(config.connectionString);
require('./config/app.config')(app, data);
require('./config/passport.config')(app, data);

app.use((req, res, next) => {
    console.log('---Current User---');
    console.log(req.user);
    next();
});

require('./routers')(app, data);

module.exports = app;
