const express = require("express");
const app = express();

const CadastroPet = require("./models/Pets");
const CadastroVeterinario = require("./models/Responsavel");

const path = require("path"); //enderço de cada rota
const router = express.Router(); // trabalha com as rotas
const moment = require("moment");
const handlebars = require("express-handlebars");

// app.use(express.static(path.join(__dirname, "styler")));

app.engine(
  "handlebars",
  handlebars({
    defaultLayout: "main",
    runtimeOptions: {
      allowProtoPropertiesByDefault: true,
      allowProtoMethodsByDefault: true,
    },
    helpers: {
      formatDate: (date) => {
        return moment(date).format("DD/MM/YYYY");
      },
    },
  })
);
app.set("view engine", "handlebars");

app.use(express.static(path.join(__dirname)));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Rotas

router.get("/cadastroVeterinario", function (req, res) {
  res.sendFile(path.join(__dirname + "/cadastroVeterinario.html"));
});

router.get("/cadastroResultado", function (req, res) {
  res.sendFile(path.join(__dirname + "/cadastroResultado.html"));
});

router.get("/cadastroPet", function (req, res) {
  res.sendFile(path.join(__dirname + "/cadastroPet.html"));
});

router.get("/", function (req, res) {
  res.sendFile(path.join(__dirname + "/index.html"));
});

router.post("/cadastroPet", function (req, res) {
  CadastroPet.create({
    nome: req.body.nome,
    especie: req.body.especie,
    raca: req.body.raca,
    idade: req.body.idade,
    observacoes: req.body.observacoes,
  })
    .then(function () {
      res.redirect("/listaPet"); //cadastro
    })
    .catch(function (erro) {
      res.send("Erro: Não foi realizado o Cadastro!" + erro);
    });
});

router.get("/listaPet", function (req, res) {
  CadastroPet.findAll().then(function (animais) {
    //cadastros
    res.render("cadastroPet", { animais: animais }); //cadastros: cadastros
  });
});

/* ---------------------------------------------------------  */

router.get("/del-pagamento/:id", function (req, res) {
  CadastroPet.destroy({
    where: { id: req.params.id },
  })
    .then(function () {
      res.redirect("/listaPet");
      /* res.send("Exclusão do registro realizado com sucesso... "); */
    })
    .catch(function (erro) {
      res.send("Exclusão do registro não realizado !");
    });
});

/* --------  */

router.get("/edit-pagamento/:id", function (req, res) {
  CadastroPet.findByPk(req.params.id).then(function (animais) {
    res.render("editar", { animais: animais });
  });
});

router.post("/edit-pagamento/:id", function (req, res) {
  CadastroPet.update(
    {
      nome: req.body.nome,
      especie: req.body.especie,
      raca: req.body.raca,
      idade: req.body.idade,
      observacoes: req.body.observacoes,
    },
    { where: { id: req.params.id } }
  )
    .then(function () {
      res.redirect("/listaPet");
    })
    .catch(function (erro) {
      res.send("Erro: Alteração nos dados não Realizado!" + erro);
    });
});

/*  ---  */

router.post("/cadastroVeterinario", function (req, res) {
  CadastroVeterinario.create({
    nome: req.body.nome,
    crmv: req.body.crmv,
    especialidade: req.body.especialidade,
    contato: req.body.contato,
  })
    .then(function () {
      res.redirect("/listaVeterinario"); //cadastro
    })
    .catch(function (erro) {
      res.send("Erro: Não foi realizado o Cadastro do Veterinario !" + erro);
    });
});

router.get("/listaVeterinario", function (req, res) {
  CadastroVeterinario.findAll().then(function (veterinarios) {
    //cadastros
    res.render("cadastroVeterinario", { veterinarios: veterinarios }); //cadastros: cadastros
  });
});

/* ---------------------------------------------------------  */

router.get("/del-veterinario/:id", function (req, res) {
  CadastroVeterinario.destroy({
    where: { id: req.params.id },
  })
    .then(function () {
      res.redirect("/listaVeterinario");
      /* res.send("Exclusão do registro realizado com sucesso... "); */
    })
    .catch(function (erro) {
      res.send("Exclusão do registro não realizado !");
    });
});

/* --------  */

router.get("/edit-veterinario/:id", function (req, res) {
  CadastroVeterinario.findByPk(req.params.id).then(function (veterinarios) {
    res.render("editarVeterinario", { veterinarios: veterinarios });
  });
});

router.post("/edit-veterinario/:id", function (req, res) {
  CadastroVeterinario.update(
    {
      nome: req.body.nome,
      crmv: req.body.crmv,
      especialidade: req.body.especialidade,
      contato: req.body.contato,
      observacoes: req.body.observacoes,
    },
    { where: { id: req.params.id } }
  )
    .then(function () {
      res.redirect("/listaVeterinario");
    })
    .catch(function (erro) {
      res.send("Erro: Alteração nos dados não Realizado!" + erro);
    });
});

/*  ---  */

app.use("/", router);
app.use("/cadastroPet", router);
app.use("/listaPet", router);
app.use("/del-pagamento/:id", router);
app.use("/edit-pagamento/:id", router);

app.use("/cadastroVeterinario", router);
app.use("/listaVeterinario", router);
app.use("/del-veterinario/:id", router);
app.use("/edit-veterinario/:id", router);

app.listen(8080);
