import Express from 'express';
import { createEmployee, deleteEmployee, getAllEmployees, updateEmployee } from '../controller/employee.controller.js';

const router = Express.Router();

router.post('/employee', createEmployee);
router.get('/employee', getAllEmployees);
router.put('/employee/:id', updateEmployee);
router.delete('/employee/:id', deleteEmployee);

export default router;