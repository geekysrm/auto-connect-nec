const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TransactionSchema = new Schema({
    from: {
        type: String
    },
    to: {
        type: String
    },
    amount: {
        type: Number,
        required: true
    },
    timeStamp: {
        type: String,
        required: true
    },
    operation: {
        type: String,
        required: true
    }
});

module.exports = TransactionSchema;
