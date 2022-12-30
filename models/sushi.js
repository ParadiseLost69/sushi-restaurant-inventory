const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SushiSchema = new Schema({
  name: { type: String, required: true, maxLength: 255, minLength: 2 },
  description: { type: String },
  category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
  price: { type: Number, required: true },
  stock: { type: Number },
});

SushiSchema.virtual("url").get(function () {
  return `sushi/${this._id}`;
});

module.exports = mongoose.model("Sushi", SushiSchema);
