const express = require("express");
const router = express.Router();

const FuncionarioModel = require("../models/FuncionarioModel");
const { validarFuncionario } = require("../validators/FuncionarioValidator");

router.get("/funcionarios", async (req, res, next) => {
  const funcionarios = await FuncionarioModel.find().populate([
    "cargo",
    "departamento",
  ]);
  res.json(funcionarios);
});

router.get("/funcionarios/:id", async (req, res, next) => {
  const funcionarioEncontrado = await FuncionarioModel.findById(
    req.params.id
  ).populate(["cargo", "departamento"]);
  if (!funcionarioEncontrado) {
    return res.status(404).json({ erro: "Não econtrado" });
  }
  res.json(funcionarioEncontrado);
});

router.post("/funcionarios", validarFuncionario, async (req, res, next) => {
  const funcionarioCadastrado = await FuncionarioModel.create(req.body);
  res.status(201).json(funcionarioCadastrado);
});

router.put("/funcionarios/:id", async (req, res, next) => {
  const id = req.params.id;
  const dados = req.body;
  const funcionarioAtualizado = await FuncionarioModel.findByIdAndUpdate(
    id,
    dados,
    { new: true }
  );
  if (!funcionarioAtualizado) {
    return res.status(404).json({ erro: "Não encontrado" });
  }
  res.json(funcionarioAtualizado);
});

router.delete("/funcionarios/:id", async (req, res, next) => {
  await FuncionarioModel.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

module.exports = router;
