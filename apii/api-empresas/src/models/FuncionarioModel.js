const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  nome: { type: String, required: true },
  cpf: { type: String, required: true },
  email: { type: String, required: true },
  telefone: { type: String, required: true },
  dataNascimento: { type: Date, required: true },
  dataContratacao: { type: Date, required: true },
  genero: { type: String, required: true },
  endereco: {
    cep: String,
    logradouro: String,
    complemento: String,
    numero: Number,
    cidade: String,
    bairro: String,
    uf: String,
  },
  cargo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cargos",
    required: true,
  },
  departamento: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Departamentos",
    required: true,
  },
});

const FuncionarioModel = mongoose.model("Funcionarios", schema);

module.exports = FuncionarioModel;
