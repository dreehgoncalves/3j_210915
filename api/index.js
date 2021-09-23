const express = require("express")
const servidor = express()
const mysql = require("mysql2")
const banco = mysql.createPool({
    database: "3j_210915",
    user: "root",
    password: "minas",
    host: "localhost",
    port: "3306",
})
const bodyParser = require('body-parser')

servidor.use(bodyParser.urlencoded({ extended: false }))
servidor.use(bodyParser.json())

/* ANDRESSA */

servidor.post("/veiculo", (req, res, next) => {
    let body = req.body;
    const QUERY = `INSERT INTO veiculo (modelo, marca, preco_venda, proprietario) VALUES('${body.modelo}', '${body.marca}', '${body.preco}', '${body.proprietario}')`;

    banco.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({
                Mensagem: "Erro no servidor"
            })
        }

        conn.query(QUERY, (error, resultado) => {
            conn.release()

            if (error) {
                return res.status(500).send({
                    Mensagem: "Erro no servidor"
                })
            }

            return res.status(200).send({
                Mensagem: "Cadastro realizado com sucesso!"
            })
        })
    })
})

servidor.get("/veiculo/andressa/:proprietario", (req, res, next) => {
    let proprietario = req.params.proprietario;
    const QUERY = `SELECT * FROM veiculo WHERE proprietario = '${proprietario}'`;

    banco.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({
                Erro: "Não foi possível atender à solicitação",
            })
        }

        conn.query(QUERY, (error, resultado) => {
            conn.release()

            if (error) {
                return res.status(500).send({
                    Erro: "Não foi possível atender à solicitação",
                })
            }

            return res.status(200).send({
                Mensagem: "Consulta realizada com sucesso",
                Dados: resultado
            })
        })
    })
})

servidor.delete("/veiculo/andressa/:modelo/:preco", (req, res, next) => {
    let modelo = req.params.modelo;
    let preco = req.params.preco;
    const QUERY = `DELETE FROM veiculo WHERE modelo = '${modelo}' AND preco_venda >= '${preco}'`;

    banco.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({
                messagem: "Erro no servidor"
            })
        }
        conn.query(QUERY, (error, resultado) => {
            conn.release()

            if (error) {
                return res.status(500).send({
                    mensagem: `Não foi possível excluir o veiculo`
                })
            }
            if (resultado.affectedRows > 0) {
                return res.status(200).send({
                    mensagem: `Veículo excluído com sucesso`
                })
            } else {
                return res.status(200).send({
                    mensagem: `Veículo não existe no banco de dados`
                })
            }
        })
    })
})

/* GIOVANA */

servidor.get("/veiculo/giovana/marca/:marca", (req, res, next) => {
    let marca = req.params.marca;
    const QUERY = `SELECT * FROM veiculo WHERE marca = '${marca}'`;

    banco.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({
                Erro: "Não foi possível atender à solicitação",
            })
        }

        conn.query(QUERY, (error, resultado) => {
            conn.release()

            if (error) {
                return res.status(500).send({
                    Erro: "Não foi possível atender à solicitação",
                })
            }

            return res.status(200).send({
                Mensagem: "Consulta realizada com sucesso",
                Dados: resultado
            })
        })
    })
})

servidor.get("/veiculo/giovana/preco/:preco", (req, res, next) => {
    let preco = req.params.preco;
    const QUERY = `SELECT * FROM veiculo WHERE preco_venda >= '${preco}'`;

    banco.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({
                Erro: "Não foi possível atender à solicitação",
            })
        }

        conn.query(QUERY, (error, resultado) => {
            conn.release()

            if (error) {
                return res.status(500).send({
                    Erro: "Não foi possível atender à solicitação",
                })
            }

            return res.status(200).send({
                Mensagem: "Consulta realizada com sucesso",
                Dados: resultado
            })
        })
    })
})

servidor.delete("/veiculo/giovana/:marca", (req, res, next) => {
    let marca = req.params.marca;
    const QUERY = `DELETE FROM veiculo WHERE marca = '${marca}'`;

    banco.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({
                messagem: "Erro no servidor"
            })
        }

        conn.query(QUERY, (error, resultado) => {
            conn.release()

            if (error) {
                return res.status(500).send({
                    mensagem: `Não foi possível excluir o veiculo`
                })
            }
            if (resultado.affectedRows > 0) {
                return res.status(200).send({
                    mensagem: `Veículo excluído com sucesso`
                })
            } else {
                return res.status(200).send({
                    mensagem: `Veículo não existe no banco de dados`
                })
            }
        })
    })
})

/* GEISA */

servidor.get("/veiculo/geisa/todos/", (req, res, next) => {
    const QUERY = `SELECT * FROM veiculo ORDER BY marca`;


    banco.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({
                Erro: "Não foi possível atender à solicitação"
            })
        }

        conn.query(QUERY, (error, resultado) => {
            conn.release()

            if (error) {
                return res.status(500).send({
                    Erro: "Não foi possível atender à solicitação",
                })
            }

            return res.status(200).send({
                Mensagem: "Consulta realizada com sucesso",
                Dados: resultado
            })
        })
    })
})

servidor.delete("/veiculo/geisa/:id", (req, res, next) => {
    let id = req.params.id;
    const QUERY = `DELETE FROM veiculo WHERE id = '${id}'`;

    banco.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({
                Erro: "Não foi possível atender à solicitação",
            })
        }

        conn.query(QUERY, (error, resultado) => {
            conn.release()

            if (error) {
                return res.status(500).send({
                    Erro: "Não foi possível atender à solicitação",
                })
            }

            return res.status(200).send({
                Mensagem: "Deletado com sucesso"
            })
        })
    })
})

servidor.patch("/veiculo/geisa/:id", (req, res, next) => {
    let id = req.params.id;
    let body = req.body;
    const QUERY = `UPDATE veiculo SET modelo = '${body.modelo}', marca = '${body.marca}', preco_venda = '${body.preco}', proprietario = '${body.proprietario}' WHERE id = ${id}`;

    banco.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({
                messagem: "Erro no servidor",
                detalhes: error,
            })
        }
        conn.query(QUERY, (error, resultado) => {
            conn.release()

            if (error) {
                return res.status(500).send({
                    mensagem: `Erro ao atualizar o cadastro`,
                })
            }
            return res.status(200).send({
                mensagem: `Veiculo atualizado com sucesso`,
            })
        })
    })
})



/* teste de conexão*/

servidor.get("/testarconexao", (req, res, next) => {
    banco.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({
                Erro: "Erro no servidor"
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