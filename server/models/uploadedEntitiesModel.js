const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const uploadedEntitiesSchema = new Schema({
    _id: {
        type: String,
        required: true
    },
    file: {
        type: String,
        required: true
    },
    entry: {
        type: String,
        ref: "entry"
    },
    metadata: [{
        filename: {
            type: String,
        },
        location: {
            type: String,
        }
    }]
});

module.exports = mongoose.model('uploadedEntity', uploadedEntitiesSchema);