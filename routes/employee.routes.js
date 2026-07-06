import Express from 'express';
import { createEmployee, deleteEmployee, getAllEmployees, registerUser, updateEmployee } from '../controller/employee.controller.js';
import { upload } from '../middlewares/multer.middleware.js';

const router = Express.Router();

router.post('/employee', createEmployee);
router.get('/employee', getAllEmployees);
router.put('/employee/:id', updateEmployee);
router.delete('/employee/:id', deleteEmployee);
router.post('/register', upload.single('avatar'), registerUser)

export default router;