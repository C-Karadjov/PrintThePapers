const { MongoClient } = require('mongodb');

const connect = (connectionString)=> {
    return MongoClient.connect(connectionString);
    // .then((db)=>{
    //     console.log('Database connected !');
    //     return db;
    // });
};

module.exports = { connect };
