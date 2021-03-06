const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DataOrgRJMSchema = new Schema(
  {
    fullDate: Date,
    nome: String,
    mes: String,
    numMes: Number,
    dia: Number,
    diaSemana: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("DataOrgRJM", DataOrgRJMSchema);
