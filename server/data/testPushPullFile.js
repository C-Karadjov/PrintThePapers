const transferFile = require('./transferFiles');
const { ObjectID } = require('mongodb');
const id = ObjectID.createFromHexString('59772f761bf40c14140d4d55');


// transferFile.push('zaproverka.zip');
// function stateChange() {
//     setTimeout(() => {
//         console.log(transferFile.retId);
//     }, 2000);
// }
// stateChange();

// transferFile.pull('simpleText.txt', '../');
transferFile.pull('zaproverka.zip', '../');

