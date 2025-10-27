const mongoose = require("mongoose");
// schema
const schema = new mongoose.Schema(
  // estrutura do registro
  {
    titulo: { type: String, required: true },
    autor: { type: String, required: true },
    editora: { type: String, required: true },
    ano: { type: Date, required: true },
    preco: { type: String, required: true },
  },
  // parametros
  {
    timestamps: true,
  }
);

// modelo
const Livros = mongoose.model("Livros", schema);

// exportar o modelo
module.exports = Livros;
