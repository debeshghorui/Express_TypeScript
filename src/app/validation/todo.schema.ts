import { z } from 'zod';

export const TodoSchema = z.object({
    id: z.number().describe('Unique identifier for the todo item'),
    title: z.string().max(100).describe('Title of the todo item, maximum length of 100 characters'),
    description: z.string().max(255).optional().describe('Description of the todo item, maximum length of 255 characters'),
    completed: z.boolean().describe('Indicates whether the todo item is completed')      
});

export type Todo = z.infer<typeof TodoSchema>;