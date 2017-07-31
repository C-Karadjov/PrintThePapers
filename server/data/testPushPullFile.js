const transferFile = require('./transferFiles');
const { ObjectID } = require('mongodb');
const id = ObjectID.createFromHexString('59772f761bf40c14140d4d55');


// transferFile.push('zaproverka.zip');

// transferFile.pull('simpleText.txt', '../');
transferFile.pull('zaproverka.zip', '../');

