import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
const app = express();

app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send('Servidor principal está online! Acesse /livros/lista para ver os livros.');
});

// Import rotas ---------------------------------------------
import appLivros from '../routes/livro.routes'; 
import appUsuarios from '../routes/usuarios.routes';
import appAuth from '../routes/auth.routes';
import appEmprestimos from '../routes/emprestimos.routes';

// Direct rotas ---------------------------------------------
app.use('/livros', appLivros);
app.use('/usuarios', appUsuarios);
app.use('/auth', appAuth);
app.use('/emprestimos', appEmprestimos);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});   