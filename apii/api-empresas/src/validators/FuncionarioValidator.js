const yup = require("yup");
const mongoose = require("mongoose");

const cpfRegex = /^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/;

const telefoneRegex = /^(\(?\d{2}\)?\s?)?(9\d{4}|\d{4})-?\d{4}$/;

const schema = yup.object().shape({
  nome: yup.string().required("nome é obrigatório"),

  cpf: yup
    .string()
    .required("cpf é obrigatório")
    .matches(cpfRegex, "Formato de CPF inválido"),

  email: yup.string().email("email inválido").required("email é obrigatório"),

  telefone: yup
    .string()
    .required("telefone é obrigatório")
    .matches(telefoneRegex, "Formato de telefone inválido"),

  dataNascimento: yup.date().required("dataNascimento é obrigatório"),
  dataContratacao: yup.date().required("dataContratacao é obrigatório"),
  genero: yup.string().required("genero é obrigatório"),

  cargo: yup
    .string()
    .required("cargo é obrigatório")
    .test("id-validator", "ID do cargo é inválido", (value) =>
      mongoose.Types.ObjectId.isValid(value)
    ),

  endereco: yup.object().shape({
    cep: yup.string().required("cep é obrigatório"),
    logradouro: yup.string().required("logradouro é obrigatório"),
    numero: yup.number().required("numero é obrigatório"),
    complemento: yup.string(),
    bairro: yup.string().required("bairro é obrigatório"),
    cidade: yup.string().required("cidade é obrigatório"),
    uf: yup.string().required("uf é obrigatório"),
  }),

  departamento: yup
    .string()
    .required("departamento é obrigatório")
    .test("id-validator", "ID do departamento é inválido", (value) =>
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
