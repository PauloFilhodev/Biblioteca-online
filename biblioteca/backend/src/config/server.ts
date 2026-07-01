import "dotenv/config";
import express from "express";
const app = express();

// // 1. Middlewares globais
// app.use(express.json());

app.get('/', (req, res) => {
    res.send('Servidor principal está online! Acesse /livros/lista para ver os livros.');
});

// Importando rotas
import appLivros from '../routes/livro.routes'; 

// Direcionando rotas
app.use('/livros', appLivros);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});   