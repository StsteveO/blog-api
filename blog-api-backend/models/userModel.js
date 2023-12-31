const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    first_name: {
        type: String,
        required: true
    },
    bio: {
        type: Schema.Types.Mixed,
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

UserSchema.virtual("url").get(function () {
  return `blog/user/${this._id}`;
});

module.exports = mongoose.model("User", UserSchema);


