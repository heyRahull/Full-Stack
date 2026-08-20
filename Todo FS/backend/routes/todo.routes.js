import express from 'express';
import { createTodo, getAllTodo, deleteTodo, updateTodo } from '../controller/todo.controller.js';

const router = express.Router();

router.post('/todo', createTodo);
router.get('/todo', getAllTodo);
router.delete('/todo/:id', deleteTodo);
router.patch('/todo/:id', updateTodo);

export default router;
