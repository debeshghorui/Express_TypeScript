import { createServer } from 'node:http';
import { env } from './env.js';
import { createApplication } from './app/index.js';

async function main() {
    try {
        const server = createServer(createApplication());
        const PORT: number = env.PORT ? +env.PORT : 3000;

        server.listen(PORT, () => {
            console.log(`Server is listening on port ${PORT}`);
            console.log(`Server URL: http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Error starting server:', error);
        throw error;
    }
}

main();