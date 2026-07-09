import express from 'express';
import { createTodo, getAllTodos, deleteTodo, updateTodo } from '../controller/todo.controller.js';

const router = express.Router();

router.post('/todo', createTodo);
router.get('/todo', getAllTodos);
router.delete('/todo/:id', deleteTodo);
// router.put('/todo/:id', doneTodo);
router.patch('/todo/:id', updateTodo);

export default router;
