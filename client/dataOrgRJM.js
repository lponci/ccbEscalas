const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DataOrgRJMSchema = new Schema(
  {
    nome: String,
    mes: String,
    dia: String,
    diaSemana: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("DataOrgRJM", DataOrgRJMSchema);
