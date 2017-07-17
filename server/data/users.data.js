const { ObjectID } = require('mongodb');
const encryptor = require('../utils/encryptor');

const getData = (db) => {
    const userCollection = db.collection('users');
    return {
        userCreate(firstName, lastName, username, password, profilePicture) {
            const salt = encryptor.generateSalt();
            const passHash = encryptor.generateHashedPassword(salt, password);
            const user = {
                firstName,
                lastName,
                username,
                passHash,
                profilePicture,
            };
            return userCollection.insertOne(user)
                .then((result) => {
                    return result;
                });
        },
        findBy(props) {
            return userCollection.findOne(props);
        },
        findById(id) {
            return userCollection.findOne(
                {
                    _id: new ObjectID(id),
                }
            )
                .then((user) => {
                    if (!user) {
                        return null;
                    }
                    user.id = user._id;
                    return user;
                });
        },
    };
};

module.exports = { getData };
