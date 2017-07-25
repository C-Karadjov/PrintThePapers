const { ObjectID } = require('mongodb');
const conectionstring = require('../config/db.config').connectionString;
const dataBase = require('../db/db');
const fs = require('fs');
const fileCollection = 'files';

// files to push must be less than 16MB
const pushFile = (fileName) => {
    // validate filename
    fs.readFile(fileName, null, (err, data) => {
        if (!err) {
            dataBase.connect(conectionstring)
                .then((db) => {
                    return db.collection(fileCollection).insert(
                        {
                            fileName: fileName,
                            dateToUpload: new Date(),
                            fileData: data,
                        });
                })
                .then((res) => {
                    return res.insertedIds[0];
                });
        } else Error('unexpected Error while reading file: ' + err);
    });
};

const pullFile = (idOrName, path) => {
    dataBase.connect(conectionstring)
        .then(async(db) => {
            let finded;
            if (idOrName instanceof ObjectID) {
                finded = await db.collection(fileCollection)
                    .findOne(idOrName);
            } else {
                finded = await (db.collection(fileCollection)
                    .findOne({ fileName: idOrName }));
            }
            return finded;
        })
        .then((file) => {
            return fs.writeFile(
                path + file.fileName,
                file.fileData.buffer,
                (err) => {
                    if (err) {
                        return console.log(err);
                    }
                    return true;
                });
        });
};

module.exports = { pushFile, pullFile };
