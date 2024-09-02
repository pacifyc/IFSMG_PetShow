const db = require("./db");
const Responsavel = db.sequelize.define("veterinarios", {
  nome: {
    type: db.Sequelize.TEXT,
  },
  crmv: {
    type: db.Sequelize.TEXT,
  },
  especialidade: {
    type: db.Sequelize.TEXT,
  },
  contato: {
    type: db.Sequelize.TEXT,
  },
});

module.exports = Responsavel;
