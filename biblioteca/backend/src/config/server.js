const express = require('express');
const app = express();
const PORT = 3000;

// 1. Middlewares globais
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Servidor principal está online! Acesse /livros para ver os livros.');
});

// Importando rotas
const appLivros = require('../routes/livro.routes'); 
// Direcionando rotas
app.use('/livros', appLivros);


app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});   