const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CargoSchema = new Schema(
  {
    key: String,
    text: String,
    value: String,
  }
);

module.exports = mongoose.model("Cargo", CargoSchema);
