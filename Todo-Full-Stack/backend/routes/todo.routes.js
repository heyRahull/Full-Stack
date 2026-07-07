import express from 'express';
import { createTodo, getAllTodos } from '../controller/todo.controller.js';

const router = express.Router();

router.post('/todo', createTodo);
router.get('/todo', getAllTodos)

export default router;
