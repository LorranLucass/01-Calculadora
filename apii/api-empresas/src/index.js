const express = require("express");
const app = express();

app.use(express.json());

// conexão com o banco
const mongoose = require("mongoose");
require("dotenv").config();

const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_NAME = process.env.DB_NAME;

const url = `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`;

mongoose
  .connect(url)
  .then(() => {
    console.log("Conectado ao banco MongoDB!!!!");
  })
  .catch((erro) => {
    console.log("Erro ao conectar no banco MongoDB: ", erro);
  });

// rotas
const CargoController = require("./controllers/CargoController");
app.use(CargoController);

const DepartamentoController = require("./controllers/DepartamentoController");
app.use(DepartamentoController);

const FuncionarioController = require("./controllers/FuncionarioController");
app.use(FuncionarioController);

const ProjetoController = require("./controllers/ProjetoController");
app.use(ProjetoController);

const TarefaController = require("./controllers/TarefaController");
app.use(TarefaController);

app.listen(3000, () => {
  console.log("Aplicação rodando -> http://locahost:3000");
});
