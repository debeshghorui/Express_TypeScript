import type { Request, Response } from 'express';
import { TodoSchema, type Todo } from "../validation/todo.schema.js";

class TodoController {
    private _db: Todo[];

    constructor() {
        this._db = [];
    }

    public getAllTodos(req: Request, res: Response) {
        const todos: Todo[] = this._db;
        return res.json({ todos });
    }

    public async createTodo(req: Request, res: Response) {
        try {
            const unvalidatedTodo = req.body;
            const validatedTodo = await TodoSchema.parseAsync(unvalidatedTodo);

            this._db.push(validatedTodo);
            return res.status(201).json({ todo: validatedTodo });
        } catch (error) {
            return res.status(400).json({ error: 'Invalid todo data' });
        }
    }
}

export default TodoController;