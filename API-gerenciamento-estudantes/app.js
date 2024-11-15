const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');

require("dotenv").config();
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;

const studentsRouter = require("./routes/students");

const app = express();

app.use(cors({
    origin: 'http://localhost:4200', // Permite apenas requisições do Angular
    methods: 'GET,POST,PUT,DELETE', // Especifica os métodos HTTP permitidos
    allowedHeaders: 'Content-Type,Authorization', // Define os cabeçalhos permitidos
    credentials: true // Permite o envio de cookies, se necessário
  }));

app.use(express.json());
app.use("/students", studentsRouter);

mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.0zfmr.mongodb.net`).then(() => {
    app.listen(3000, () => {
        console.log("Conectado ao MongoDB");
        console.log("Servidor iniciado na porta 3000");
    });
})
.catch((err) => {
    console.log(err);
});
