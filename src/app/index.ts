import express from 'express';
import type { Express } from 'express';

import todoRouter from './todo/routes.js'
import authRouter from './auth/routes.js';

export function createApplication(): Express {
    const app = express();

    app.use(express.json());

    app.use('/v1/todos', todoRouter);

    // Routers
    app.get('/', (req, res) => {
        res.send('Hello World!');
    });
    
    // Auth routes
    app.use('/v1/auth', authRouter)

    return app;
}