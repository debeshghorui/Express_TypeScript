import { z } from 'zod';

const envSchema = z.object({
    PORT: z.string().default('8080'),
    // API_KEY: z.string().min(1)
})

function createEnv(env: NodeJS.ProcessEnv) {
    const safeParsedEnv = envSchema.safeParse(env);
    
    if (!safeParsedEnv.success) {
        console.error('Invalid environment variables:', safeParsedEnv.error.format());
        throw new Error(`Invalid environment variables: ${safeParsedEnv.error.message}`);
    }

    return safeParsedEnv.data;
}

export const env = createEnv(process.env);