const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TransactionSchema = require("./TransactionSchema");

const DriverSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    profilePic: {
        type: String,
        required: true,
        default: "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"
    },
    name: {
        type: String,
        required: true
    },
    autoNumber: {
        type: String
    },
    money: {
        type: Number,
        required: true,
        default: 50
    },
    transactions: {
        type: [TransactionSchema]
    }
});

const Driver = mongoose.model("Driver", DriverSchema);

module.exports = Driver;
