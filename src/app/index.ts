import express from 'express';
import type { Express } from 'express';
import todoRouter from './todo/routes.js'

export function createApplication(): Express {
    const app = express();

    app.use(express.json());

    app.use('/todos', todoRouter);

    // Routers
    app.get('/', (req, res) => {
        res.send('Hello World!');
    });


    return app;
}