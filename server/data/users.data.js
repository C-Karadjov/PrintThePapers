const { ObjectID } = require('mongodb');
const encryptor = require('../utils/encryptor');

const getData = (db) => {
    const userCollection = db.collection('users');
    return {
        userCreate(firstName, lastName, username,
                   password, email, profilePicture) {
            const salt = encryptor.generateSalt();
            const passHash = encryptor.generateHashedPassword(password, salt);

            let _profilePicture = {};

            if (!profilePicture) {
                _profilePicture = {
                    src: '/public/images/default.user.png',
                };
            } else {
                _profilePicture.src = profilePicture.src;
            }

            const user = {
                firstName,
                lastName,
                username,
                passHash,
                email,
                profilePicture: _profilePicture,
            };
            return userCollection.insertOne(user)
                .then((result) => {
                    return result;
                });
        },
        findByPage(page) {
            page = page || 1;
            const pageSize = 10;

            return userCollection.find()
                .skip((page - 1) * pageSize)
                .limit(pageSize).toArray()
                .then((result)=>{
                    return userCollection.count()
                        .then((count)=> {
                            count = {
                                users: result,
                                count,
                            };
                            return count;
                        });
                });
        },
        findAll() {
            return userCollection.find().toArray();
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
        updateUser(targetUser, newData) {
            return userCollection.updateOne(
                { username: targetUser.username }, { $set: newData });
        },
        removeUser(userForDelete) {
            return userCollection.
            deleteOne({ username: userForDelete.username });
        },
    };
};

module.exports = { getData };
