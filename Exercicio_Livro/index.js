// index.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

// --- Configuração da conexão com MongoDB (Mongoose) ---
const {
  DB_USER,
  DB_PASS,
  DB_HOST,
  DB_NAME,
  PORT = 3000
} = process.env;

if (!DB_USER || !DB_PASS || !DB_HOST || !DB_NAME) {
  console.error('Erro: variáveis de ambiente do banco não estão todas definidas.');
  process.exit(1);
}

// Monta a connection string (ajuste caso use SRV)
const uri = `mongodb+srv://${encodeURIComponent(DB_USER)}:${encodeURIComponent(DB_PASS)}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Conectado ao MongoDB Atlas'))
  .catch(err => {
    console.error('Erro ao conectar no MongoDB:', err);
    process.exit(1);
  });

// --- Definição do modelo de Book ---
const bookSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  autor: { type: String, required: true },
  editora: { type: String, required: true },
  ano: { type: Number, required: true },
  preco: { type: Number, required: true }
}, { timestamps: true });

const Book = mongoose.model('Book', bookSchema);

// --- Rotas CRUD ---
// Health check
app.get('/', (req, res) => res.json({ ok: true, message: 'API de livros rodando' }));

// Criar livro
app.post('/books', async (req, res) => {
  try {
    const { titulo, autor, editora, ano, preco } = req.body;
    if (!titulo || !autor || !editora || ano == null || preco == null) {
      return res.status(400).json({ error: 'Campos obrigatórios: titulo, autor, editora, ano, preco' });
    }

    const newBook = new Book({ titulo, autor, editora, ano, preco });
    const saved = await newBook.save();
    return res.status(201).json(saved);
  } catch (err) {
    console.error('POST /books error:', err);
    return res.status(500).json({ error: 'Erro ao criar o livro' });
  }
});

// Listar todos os livros (com paginação opcional)
app.get('/books', async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.max(1, Math.min(100, parseInt(req.query.limit) || 20));
    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
      Book.find().skip(skip).limit(limit).sort({ createdAt: -1 }),
      Book.countDocuments()
    ]);

    return res.json({ page, limit, total, items });
  } catch (err) {
    console.error('GET /books error:', err);
    return res.status(500).json({ error: 'Erro ao listar livros' });
  }
});

// Buscar por id
app.get('/books/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) return res.status(400).json({ error: 'ID inválido' });

    const book = await Book.findById(id);
    if (!book) return res.status(404).json({ error: 'Livro não encontrado' });

    return res.json(book);
  } catch (err) {
    console.error('GET /books/:id error:', err);
    return res.status(500).json({ error: 'Erro ao buscar livro' });
  }
});

// Atualizar por id (substituição parcial com $set)
app.put('/books/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) return res.status(400).json({ error: 'ID inválido' });

    const { titulo, autor, editora, ano, preco } = req.body;
    const update = {};
    if (titulo !== undefined) update.titulo = titulo;
    if (autor !== undefined) update.autor = autor;
    if (editora !== undefined) update.editora = editora;
    if (ano !== undefined) update.ano = ano;
    if (preco !== undefined) update.preco = preco;

    if (Object.keys(update).length === 0) {
      return res.status(400).json({ error: 'Nenhum campo para atualizar' });
    }

    const updated = await Book.findByIdAndUpdate(id, { $set: update }, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ error: 'Livro não encontrado' });

    return res.json(updated);
  } catch (err) {
    console.error('PUT /books/:id error:', err);
    return res.status(500).json({ error: 'Erro ao atualizar livro' });
  }
});

// Remover por id
app.delete('/books/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) return res.status(400).json({ error: 'ID inválido' });

    const deleted = await Book.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ error: 'Livro não encontrado' });

    return res.json({ message: 'Livro removido com sucesso', book: deleted });
  } catch (err) {
    console.error('DELETE /books/:id error:', err);
    return res.status(500).json({ error: 'Erro ao remover livro' });
  }
});

// Erro 404 para rotas desconhecidas
app.use((req, res) => {
  res.status(404).json({ error: 'Rota não encontrada' });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
