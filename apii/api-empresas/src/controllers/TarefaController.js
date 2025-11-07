const express = require("express");
const router = express.Router();

const TarefaModel = require("../models/TarefaModel");
const { validarTarefa } = require("../validators/TarefaValidator");

// rotas
router.get("/tarefas", async (req, res, next) => {
  const tarefas = await TarefaModel.find();
  res.json(tarefas);
});

router.get("/tarefas/:id", async (req, res, next) => {
  const tarefaEncontrada = await TarefaModel.findById(req.params.id);
  if (!tarefaEncontrada) {
    return res.status(404).json({ erro: "Não encontrado" });
  }
});

router.post("/tarefas", validarTarefa, async (req, res, next) => {
  const tarefaCriada = await TarefaModel.create(req.body);
  res.status(201).json(tarefaCriada);
});

router.put("/tarefas/:id", validarTarefa, async (req, res, next) => {
  const id = req.params.id;
  const tarefaAtualizada = await TarefaModel.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (!tarefaAtualizada) {
    return res.status(404).json({ erro: "Não econtrado" });
  }
  res.json(tarefaAtualizada);
});

router.delete("/tarefas/:id", async (req, res, next) => {
  await TarefaModel.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

module.exports = router;
