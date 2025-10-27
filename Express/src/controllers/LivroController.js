const express = require("express");
const router = express.Router();
// importo o modelo
const Livros = require("../models/Livros");

// importo os validadores
const { validarNovoLivro } = require("../validators/LivroValidator");
const { validarID } = require("../validators/IDValidator");

// Rotas
// Cadastro
router.post("/livros", validarNovoLivro, async (req, res, next) => {
  const dados = req.body;
  const livroCadastrado = await Livros.create(dados);
  res.status(201).json(livroCadastrado);
});

// Leitura
router.get("/livros", async (req, res, next) => {
  const livros = await Livros.find();
  res.json(livros);
});

router.get("/livros/:id", validarID, async (req, res, next) => {
  const livroEncontrado = await Livros.findById(req.params.id);
  if (!livroEncontrado) {
    return res.status(404).json({ erro: "Livro não econtrado!" });
  }
  res.json(livroEncontrado);
});

// Atualização
router.put("/livros/:id", validarID, async (req, res, next) => {
  const id = req.params.id;
  const novosDados = req.body;
  const livroAtualizado = await Livros.findByIdAndUpdate(id, novosDados, {
    new: true,
  });
  if (!livroAtualizado) {
    return res.status(404).json({ erro: "Livro não encontrado!" });
  }
  res.json(livroAtualizado);
});

// Exclusão
router.delete("/livros/:id", validarID, async (req, res, next) => {
  const id = req.params.id;
  await Livros.findByIdAndDelete(id);
  res.status(204).send();
});

module.exports = router;
