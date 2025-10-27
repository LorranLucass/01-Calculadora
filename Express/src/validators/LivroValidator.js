const yup = require("yup");
// Esquema de validação
const schemaNovoLivro = yup.object().shape({
  titulo: yup
    .string()
    .min(5, "titulo inválido")
    .max(50, "titulo inválido")
    .required("titulo é obrigatório"),
  autor: yup
    .string()
    .min(5, "autor inválido")
    .max(50, "autor inválido")
    .required("autor é obrigatório"),
  autor: yup
    .string()
    .min(5, "autor inválido")
    .max(50, "autor inválido")
    .required("autor é obrigatório"),
  ano: yup.date().required("ano é obrigatório"),
  preco: yup.string().required("preco é obrigatório"),
});

// Middleware de validação
async function validarNovoLivro(req, res, next) {
  try {
    await schemaNovaPessoa.validate(req.body, { abortEarly: false });
    next();
  } catch (error) {
    return res.status(400).json({ erros: error.errors });
  }
}

// exporto o middleware pra usar no controller
module.exports = {
  validarNovoLivro,
};
