import { Router } from 'express';
import TodoController from './controller.js';

const router: Router = Router();

const controller = new TodoController();

// Bind the controller method to maintain the correct 'this' context
router.get('/', controller.getAllTodos.bind(controller));
// router.get('/:id')

router.post('/', controller.createTodo.bind(controller)); 

// router.put('/:id')
// router.delete('/:id')

export default router;