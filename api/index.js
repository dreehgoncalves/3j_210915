const express = require("express")
const servidor = express()
const mysql = require("mysql2")
const banco = mysql.createPool({
    database: "3j_210915",
    user: "root",
    password: "",
    host: "localhost",
    port: "3306",
})
const bodyParser = require('body-parser')

servidor.use(bodyParser.urlencoded({ extended: false }))
servidor.use(bodyParser.json())

servidor.post("/veiculo", (req, res, next) => {
    let body = req.body;
    const QUERY = `INSERT INTO veiculo (modelo, marca, preco_venda, proprietario) VALUES('${body.modelo}', '${body.marca}', '${body.preco}', '${body.venda}', '${body.proprietario}')`;

    banco.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({
                Mensagem: "Erro no servidor",
                Detalhes: error
            })
        }

        conn.query(QUERY, (error, resultado) => {
            conn.release()

            if (error) {
                return res.status(500).send({
                    Mensagem: "Erro no servidor",
                    Detalhes: error
                })
            }

            return res.status(200).send({
                Mensagem: "Cadastro realizado com sucesso!",
            })
        })
    })
})

servidor.get("/veiculo/:proprietario", (req, res, next) => {
    let proprietario = req.params.proprietario;
    const QUERY = `SELECT * FROM veiculo WHERE proprietario = '${proprietario}'`;

    banco.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({
                Erro: "Não foi possível atender à solicitação",
                Detalhes: error,
            })
        }

        conn.query(QUERY, (error, resultado) => {
            conn.release()

            if (error) {
                return res.status(500).send({
                    Erro: "Não foi possível atender à solicitação",
                    Detalhes: error,
                })
            }

            return res.status(200).send({
                Mensagem: "Consulta realizada com sucesso",
                Dados: resultado,
            })
        })
    })
})

/* teste de conexão geisa aaa*/

servidor.get("/testarconexao", (req, res, next) => {
    banco.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({
                Erro: "Erro no servidor",
                Detalhes: error,
            })
        }

        conn.release()

        return res.status(200).send({
            Mensagem: "Conexão estabelecida com sucesso",
        })
    })
})

servidor.get("/", (req, res, next) => {
    return res.send({
        mensagem: "Bem-vindo(a) ao servidor",
        cidade: "Itapeva",
        uf: "SP",
    })
})

servidor.listen(3000, () => {
    console.log("Servidor funcionando!")
})