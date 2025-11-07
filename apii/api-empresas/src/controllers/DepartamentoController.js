const express = require("express");
const router = express.Router();

const DepartamentoModel = require("../models/DepartamentoModel");
const { validarDepartamento } = require("../validators/DepartamentoValidator");

//CRUD
router.get("/departamentos", async (req, res, next) => {
  const departamentos = await DepartamentoModel.find();
  res.json(departamentos);
});

router.get("/departamentos/:id", async (req, res, next) => {
  const departamentoEcontrado = await DepartamentoModel.findById(req.params.id);
  if (!departamentoEcontrado) {
    return res.status(404).json({ erro: "Não econtrado" });
  }
  res.json(departamentoEcontrado);
});

router.post("/departamentos", validarDepartamento, async (req, res, next) => {
  const departamentoCriado = await DepartamentoModel.create(req.body);
  res.status(201).json(departamentoCriado);
});

router.put(
  "/departamentos/:id",
  validarDepartamento,
  async (req, res, next) => {
    const id = req.params.id;
    const dados = req.body;
    const departamentoAtualizado = await DepartamentoModel.findByIdAndUpdate(
      id,
      dados,
      { new: true }
    );
    if (!departamentoAtualizado) {
      return res.status(404).json({ erro: "Não encontrado" });
    }
    res.json(departamentoAtualizado);
  }
);

router.delete("/departamentos/:id", async (req, res, next) => {
  await DepartamentoModel.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

module.exports = router;
