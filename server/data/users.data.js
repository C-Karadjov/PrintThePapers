const { ObjectID } = require('mongodb');

const getData = (db) => {
    // const userCollection = db.collection('users');
    return {
        userCreate(username, password) {
            const user = {
                username,
                password,
            };
            return userCollection.insertOne(user)
                .then((result) => {
                    return result;
                });
        },
    };
};

module.exports = { getData };
