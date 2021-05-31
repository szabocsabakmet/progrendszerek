const mongoos = require("mongoose");
const Schema = mongoos.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, {timestamps: true});

const User = mongoos.model("User", userSchema);
module.exports = User;