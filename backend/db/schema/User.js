const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TransactionSchema = require("./TransactionSchema");

const UserSchema = new Schema({
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
    money: {
        type: Number,
        required: true,
        default: 50
    },
    transactions: {
        type: [TransactionSchema]
    }
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
