import { Router}  from 'express';
import { createTodo, displayTodos, updateTodo, deleteTodo } from '../controllers/todos';

const router = Router();

router.post('/', createTodo);

router.get('/', displayTodos);

router.patch('/:id', updateTodo);

router.delete('/:id', deleteTodo);

export default router;