const express = require("express");
const router = express.Router();

const ProjetoModel = require("../models/ProjetoModel");
const { validarProjeto } = require("../validators/ProjetoValidator");

// rotas
router.get("/projetos", async (req, res, next) => {
  const projetos = await ProjetoModel.find();
  res.json(projetos);
});

router.get("/projetos/:id", async (req, res, next) => {
  const projetoEncontrado = await ProjetoModel.findById(req.params.id);
  if (!projetoEncontrado) {
    return res.status(404).json({ erro: "Não encontrado" });
  }
});

router.post("/projetos", validarProjeto, async (req, res, next) => {
  const projetoCriado = await ProjetoModel.create(req.body);
  res.status(201).json(projetoCriado);
});

router.put("/projetos/:id", validarProjeto, async (req, res, next) => {
  const id = req.params.id;
  const projetoAtualizado = await ProjetoModel.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (!projetoAtualizado) {
    return res.status(404).json({ erro: "Não econtrado" });
  }
  res.json(projetoAtualizado);
});

router.delete("/projetos/:id", async (req, res, next) => {
  await ProjetoModel.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

module.exports = router;
