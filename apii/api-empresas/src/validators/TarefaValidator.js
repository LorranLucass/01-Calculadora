const yup = require("yup");
const mongoose = require("mongoose");

const schema = yup.object().shape({
  titulo: yup.string().required("titulo é obrigatório"),

  descricao: yup.string().required("descricao é obrigatório"),

  dataInicio: yup.date().required("dataInicio é obrigatório"),
  dataFim: yup.date().required("dataFim é obrigatório"),

  responsavel: yup
    .string()
    .required("responsavel é obrigatório")
    .test("id-validator", "ID do responsavel é inválido", (value) =>
      mongoose.Types.ObjectId.isValid(value)
    ),

  projeto: yup
    .string()
    .required("projeto é obrigatório")
    .test("id-validator", "ID do projeto é inválido", (value) =>
      mongoose.Types.ObjectId.isValid(value)
    ),
});

async function validarFuncionario(req, res, next) {
  try {
    await schema.validate(req.body, { abortEarly: false });
    next();
  } catch (error) {
    return res.status(400).json({ erros: error.errors });
  }
}

module.exports = { validarFuncionario };
