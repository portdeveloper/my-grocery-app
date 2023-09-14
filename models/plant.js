const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const plantSchema = new Schema({
  name: { type: String, required: true },
  scientificName: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: Schema.Types.ObjectId, ref: "Category" },
  price: { type: Number, required: true },
  numberInStock: { type: Number, required: true },
  image: { type: String, required: false },
});

plantSchema.virtual("url").get(function () {
  return `/plants/${this._id}`;
});

module.exports = mongoose.model("Plant", plantSchema);
