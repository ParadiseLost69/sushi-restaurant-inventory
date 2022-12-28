const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  name: { type: String, maxLength: 255, minLength: 5, required: true },
  description: { type: String, minLength: 5, required: true },
});

CategorySchema.virtual("url").get(function () {
  return `/sushi/category/${this._id}`;
});

module.exports = mongoose.model("Category", CategorySchema);
