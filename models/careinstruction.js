const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const careInstructionSchema = new Schema({
  plant: { type: Schema.Types.ObjectId, ref: "Plant" },
  light: { type: String, required: true },
  water: { type: String, required: true },
  temperature: { type: String, required: true },
});

module.exports = mongoose.model("CareInstruction", careInstructionSchema);
