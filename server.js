const express = require('express');
const app = express();
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const dotenv = require("dotenv");
require('dotenv').config()
const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Conectado ao Banco de Dados'))

app.use(express.json())

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'Negocio Pocket API',
            description: "Para  o dono de empresa de tecnologia que precisa inserir dados de clientes e separar por categorias (ouro,prata, bronze), o seu Negocio Poacket é (um software, que mostra informações para o dono a fim de tornar mais  atualizado e ter melhor  controle  sobre os serviços prestados aos clientes, que reúne os dados dos clientes. Dando ao operador do site a possibilidade de criar, listar os clientes cadastrados, atualizar e deletar se  alguma informação  for necessária, bem como modificar as categorias dos clientes."
        },
    },
    apis: ["./routes/dados.js"]
}

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


const dadosRouter = require('./routes/dados')
app.use('/dados', dadosRouter)


app.listen(8080, () => console.log('Servidor Iniciado')) 