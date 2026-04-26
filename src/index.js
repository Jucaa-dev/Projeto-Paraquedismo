import 'dotenv/config';

import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

import authRoutes from './routes/authRoutes.js';

import clienteRoutes from './routes/clienteRoutes.js';

import  cursoRoutes from './routes/cursoRoutes.js';

import saltoDeParaquedasRoutes from './routes/saltoDeParaquedasRoutes.js';

import agendamentoRoutes from './routes/agendamentoRoutes.js';

import { request } from 'http';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const corsOptions = {
    origin: ['http://localhost:3333', 'http://127.0.0.1:5500'],
    methods: 'GET, POST, PUT, PATCH, DELETE',
    credentials: true
};

const app = express();

app.use(helmet());
app.use(cors(corsOptions));
app.use(morgan('dev'));
app.use(express.json());

app.use(express.static(path.join(__dirname,'..','public')));

app.get('/', (request, response) => {
    response.sendFile(path.join(__dirname,'..','pages','home.html'));
});

const apiPrefix = '/api';
app.use(`${apiPrefix}/cliente`, clienteRoutes);
app.use(`${apiPrefix}/login`,authRoutes);
app.use(`${apiPrefix}/curso`,cursoRoutes);
app.use(`${apiPrefix}/saltosDeParaquedas`,saltoDeParaquedasRoutes);
app.use(`${apiPrefix}/agendamento`,agendamentoRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('algo deu errado no servidor!');
});

const PORTA  = process.env.PORTA || 3333;
app.listen(PORTA, () => {
    console.log(`Servidor rodando na porta ${PORTA}`)
});