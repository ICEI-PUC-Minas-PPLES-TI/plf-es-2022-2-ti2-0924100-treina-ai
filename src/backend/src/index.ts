import express from 'express';
import usuarioRoutes from './routes/usuario.routes';
import moduloRoutes from './routes/modulos.routes';
import acessoRoutes from './routes/acesso.routes';
import tutorialRoutes from './routes/tutoriais.routes';
import provasRoutes from './routes/provas.routes'
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

app.use('/Acessomodulo', acessoRoutes);
app.use('/Usuario', usuarioRoutes);
app.use('/Modulo', moduloRoutes);
app.use('/Tutorial', tutorialRoutes);
app.use('/Prova', provasRoutes);
app.get('/', async (req, res) =>{
    return res.status(200).send("Hello World!!");
})
app.listen(3333 || process.env.PORT);