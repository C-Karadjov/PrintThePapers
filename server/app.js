const express = require('express');

const app = express();

require('./config/app.config').configApp(app);

const config = require('./config');
const db = require('./db').connect(config.connectionString);
const data = require('./data').init(db);


require('./config/passport.config').configPassport(app, data);
require('./routers').attachRouters(app, data);

module.exports = app;
