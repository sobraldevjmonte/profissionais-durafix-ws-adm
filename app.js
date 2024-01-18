const express = require("express");
const cors = require("cors");
const app = express();
const morgan = require("morgan");

const bodyParser = require("body-parser");
const rotaUsuarios = require("./routes/usuarios");
// const rotaPedidos = require('./routes/pedidos')
const rotaProdutos = require("./routes/produtos");
const rotaProdutosCategorias = require("./routes/produtos_categorias");
const rotaCores = require("./routes/cores");
const tamanhoCores = require("./routes/tamanhos");
const rotaVendas = require("./routes/vendas");
const rotaClientes = require("./routes/clientes");
// -------------------- ADMINISTRADOR ------------------------
const rotaAdmVendas = require("./routes_adm/adm_vendas");
const rotaAdmProdutos = require("./routes_adm/adm_produtos");
const rotaAdmProdutosCategorias = require("./routes_adm/adm_produtos_categorias");
const rotaAdmProdutosTamanhos = require("./routes_adm/adm_produtos_tamanhos");
const rotaAdmUsuarios = require("./routes_adm/adm_usuarios");

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false })); //apenas dados simples
app.use(bodyParser.json()); //apenas formato json de entrada
app.use(cors());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
	  res.setHeader(
		"Access-Control-Allow-Methods",
		"OPTIONS, GET, POST, PUT, PATCH, DELETE"
	  );
	  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
	  
	  if (req.method === "OPTIONS") {
        res.setHeader("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).send({});
	}

    next();
});

app.use("/usuarios", rotaUsuarios);
// app.use('/pedidos', rotaPedidos);
app.use("/produtos", rotaProdutos);
app.use("/produtosCategorias", rotaProdutosCategorias);
app.use("/cores", rotaCores);
app.use("/tamanhos", tamanhoCores);
app.use("/vendas", rotaVendas);
app.use("/clientes", rotaClientes);
//---------------------------- ADMINISTRADOR -------------
app.use("/adm_vendas", rotaAdmVendas);
app.use("/adm_produtos", rotaAdmProdutos);
app.use("/adm_produtos_categorias", rotaAdmProdutosCategorias);
app.use("/adm_produtos_tamanhos", rotaAdmProdutosTamanhos);
app.use("/adm_usuarios", rotaAdmUsuarios);
//----------- quando nao encontra a rota --------------
app.use((req, res, next) => {
    const erro = new Error("Rota não encontrada!");
    erro.status = 404;
    next(erro);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    return res.send({
        erro: {
            mensagem: error.message,
        },
    });
});

module.exports = app;
