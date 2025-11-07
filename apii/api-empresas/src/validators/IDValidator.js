const mongoose = require("mongoose");

function validarID(paramName) {
  return (req, res, next) => {
    const id = req.params[paramName];

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ erro: "Formato de ID inválido" });
    }
    next();
  };
}

module.exports = validarID;
