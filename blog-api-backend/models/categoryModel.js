const mongoose= require("mongoose");
const Schema= mongoose.Schema;

const CategorySchema= new Schema({
    name: {
        type: String,
        required: true
    },
    synopsis: {
        type: String,
        required: true
    }
});

CategorySchema.virtual("url").get(function(){
    return `blog/category/${this._id}`;
})

mongoose.model.exports = mongoose.model("Category", CategorySchema);