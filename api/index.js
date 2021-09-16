const express = require("express");
const servidor = express();
const mysql = require("mysql2");
const banco = mysql.createPool({
    database: "3j_210915",
    user: "root",
    password: "",
    host: "localhost",
    port: "3306",
});
const bodyParser = require('body-parser')

servidor.use(bodyParser.urlencoded({ extended: false }))
servidor.use(bodyParser.json())
a


/* teste de conexão geisa */

servidor.get("/testarconexao", (req, res, next) => {
    banco.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({
                Erro: "Erro no servidor",
                Detalhes: error,
            });
        }

        conn.release();

        return res.status(200).send({
            Mensagem: "Conexão estabelecida com sucesso",
        });
    });
});

servidor.get("/", (req, res, next) => {
    return res.send({
        mensagem: "Bem-vindo(a) ao servidor",
        cidade: "Itapeva",
        uf: "SP",
    });
});

servidor.listen(3000, () => {
    console.log("Servidor funcionando!");
});