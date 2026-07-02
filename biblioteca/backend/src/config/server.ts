import "dotenv/config";
import express from "express";
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Servidor principal está online! Acesse /livros/lista para ver os livros.');
});

// Import rotas ---------------------------------------------
import appLivros from '../routes/livro.routes'; 

// Direct rotas ---------------------------------------------
app.use('/livros', appLivros);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});   