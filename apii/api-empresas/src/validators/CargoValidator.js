const yup = require("yup");

const schema = yup.object().shape({
  nome: yup.string().required("nome é obrigatório"),
  descricao: yup.string().required("descricao é obrigatório"),
  salario: yup
    .number()
    .required("salario é obrigatório")
    .min(1518.0, "salario minimo é de 1518.00"),
});

async function validarCargo(req, res, next) {
  try {
    await schema.validate(req.body, { abortEarly: false });
    next();
  } catch (error) {
    return res.status(400).json({ erros: error.errors });
  }
}

module.exports = { validarCargo };
