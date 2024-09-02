const db = require("./db");
const Pets = db.sequelize.define("animais", {
  //cadastrados
  nome: {
    type: db.Sequelize.TEXT,
  },
  especie: {
    type: db.Sequelize.TEXT,
  },
  raca: {
    type: db.Sequelize.TEXT,
  },
  idade: {
    type: db.Sequelize.INTEGER,
  },
  observacoes: {
    type: db.Sequelize.TEXT,
  },
});

module.exports = Pets;
