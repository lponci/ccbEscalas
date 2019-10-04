const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DataSchema = new Schema(
  {
    nome: String,
    cargo: String,
    phone: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("Data", DataSchema);
