class User {

}

class Data {
    constructor(data, ModelClass) {
        this.data = data;
        this.ModelClass = ModelClass;
        this.collectionName = this._getCollectionName;
        this.collection = this.data.collection(this.collectionName);
    }

    getAll() {
        return this.collection.find()
            .toArray();
    }

    create(model) {
        return this.collection.insertOne(model);
    }

    _getCollectionName() {
        return this.ModelClass.name.toLowerCase() + 's';
    }
}


const init = (data) => {
    return {
        users: new Data(data, User),
    };
};

module.exports = init;


