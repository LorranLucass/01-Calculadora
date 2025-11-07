const yup = require("yup");

const schema = yup.object().shape({
  nome: yup
    .string()
    .min(3, "o nome precisa de pelo menos 3 caracteres")
    .max(50, "o nome precisa de no máximo 50 caracteres")
    .required("nome é obrigatório"),
  descricao: yup
    .string()
    .min(3, "a descricao precisa de pelo menos 3 caracteres")
    .max(250, "a descrica precisa de no máximo 250 caracteres")
    .required("descricao é obrigatório"),
});

async function validarDepartamento(req, res, next) {
  try {
    await schema.validate(req.body, { abortEarly: false });
    next();
  } catch (error) {
    return res.status(400).json({ erros: error.errors });
  }
}

module.exports = { validarDepartamento };
