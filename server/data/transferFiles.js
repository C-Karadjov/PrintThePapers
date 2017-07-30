const { ObjectID } = require('mongodb');
const conectionstring = require('../config/db.config').connectionString;
const dataBase = require('../db/db');
const fs = require('fs');
const fileCollection = 'files';

// files to push must be less than 16MB
const push = (fileName) => {
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

const pull = (idOrName, path) => {
    dataBase.connect(conectionstring)
        .then(async(db) => {
            let finded;
            if (idOrName instanceof ObjectID) {
                finded = await db.collection(fileCollection)
                    .findOne(idOrName);
            } else {
                // finding first file with name idOrName
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

module.exports = { push, pull };
