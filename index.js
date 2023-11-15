import express from 'express';
import { corsMiddleware } from './middlewares/cors.js';
import { usersRouter } from './routes/users.js';
import { UserModel } from './models/mysql/movie.js';
import 'dotenv/config';
import mysql from 'mysql2/promise';  // Importa la librería mysql2/promise

const app = express();
app.use(express.json());
app.use(corsMiddleware());
app.disable('x-powered-by');

try {
    const DEFAULT_CONFIG = {
        host: '127.0.0.1',
        user: 'root',
        port: 3306,
        password: '',
        database: 'pruebadb',
    };
    const connectionString = process.env.DATABASE_URL ?? DEFAULT_CONFIG;

    const pool = await mysql.createPool(connectionString);
    console.log('Conexión a la base de datos establecida correctamente.');

    // Middleware para agregar el pool a la solicitud
    app.use((req, res, next) => {
        req.mysql = pool;
        next();
    });
} catch (error) {
    console.error('Error al conectar a la base de datos:', error.message);
}

app.post('/users', async (req, res) => {
    try {
        const input = req.body;
        const newUser = await UserModel.create({ input, pool: req.mysql });
    
        res.status(201).json(newUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

app.use('/users', usersRouter);

const PORT = process.env.PORT || 1234;

app.listen(PORT, () => {
    console.log(`server listening on port http://localhost:${PORT}`);
});

