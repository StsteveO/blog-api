const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  article_picture: {
    type: String,
  },
  picture_credit: {
    type: String,
  },
  preview: {
    type: String,
    required: true,
  },
  article_body: {
    type: String,
    required: true,
  },
  article_is_active: {
    type: Boolean,
    required: true
  }
});

ArticleSchema.virtual("url").get(function () {
  return `blog/article/${this._id}`;
});

module.exports = mongoose.model("Article", ArticleSchema);
