const express = require('express');
const app = express();

app.get('/listas', (req, res) => {
    res.send("Requisição recebida em /livros");
});

module.exports = app;