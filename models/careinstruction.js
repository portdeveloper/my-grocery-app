const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const careInstructionSchema = new Schema({
  plant: { type: Schema.Types.ObjectId, ref: "Plant" },
  light: { type: String, required: true },
  water: { type: String, required: true },
  temperature: { type: String, required: true },
});

careInstructionSchema.virtual("url").get(function () {
  return `/plants/${this.plant}/care-instructions`;
});

module.exports = mongoose.model("CareInstruction", careInstructionSchema);
