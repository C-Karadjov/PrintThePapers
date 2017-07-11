const { MongoClient } = require('mongodb');

const configDb = (connectionString) => {
    return MongoClient.connect(connectionString);
};

module.exports = configDb;
