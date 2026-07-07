import express from 'express';
import mongoose from 'mongoose';
import employeeRoutes from './routes/employee.routes.js'

const app = express();
app.use(express.json());
app.use('/api/v1', employeeRoutes)

// const employeeSchema = new mongoose.Schema({
//     username:String,
//     email:String,
//     role:String
// });

// const Employee = mongoose.model('Employee', employeeSchema);

// app.post('/api/v1/employee', async (req, res) => {
//     try{
//         const createEmployee = await Employee.create(req.body);
//         res.status(200).json({
//             success: true,
//             message: "Employee record created successfully",
//             detail: createEmployee
//         })
//     }catch(err){
//         res.status(500).json({
//             success:false,
//             message:'Failed to create employee record',
//             error: err.message
//         })
//     }
// });

// app.get('/api/v1/employee', async (req, res) => {
//     try{
//         const getAllEmployees = await Employee.find({});
//         res.status(200).json({
//             success: true,
//             message: "Successfully fetched all users data",
//             count: getAllEmployees.length,
//             details: getAllEmployees,
//         })
//     }catch(err){
//         res.status(500).json({
//             success: false,
//             message: "Not able to fetch employees data",
//             error : err.message
//         })
//     }
// });

// app.put('/api/v1/employee/:id', async (req, res) => {
//     try{
//         const {id} = req.params
//         const updatedEmployeRecord = await Employee.findByIdAndUpdate(id, req.body, {new: true}); 
//         res.status(200).json({
//             success: true,
//             message: "Updated Employee details successfully",
//             details : updatedEmployeRecord
//         });
//     }catch(err){
//         res.status(500).json({
//             sucess: false,
//             message: "Unable to update Employee record",
//             error: err.message
//         })
//     }
// });

// app.delete('/api/v1/employee/:id', async (req, res) => {
//     try{
//         const {id} = req.params;
//         const deletedUser = await Employee.findByIdAndDelete(id);
//         res.status(500).json({
//             success: true,
//             message: "Deleted Employee details successlly",
//             details : deletedUser
//         })
//     }catch(err){
//         res.status(500).json({
//             success: false,
//             message: "Not able to delete Employee details",
//             error: err.message
//         })
//     }
// })

mongoose.connect("mongodb://rahulag774_db_user:1234Rahul@ac-zykgbeb-shard-00-00.tdjfdzo.mongodb.net:27017,ac-zykgbeb-shard-00-01.tdjfdzo.mongodb.net:27017,ac-zykgbeb-shard-00-02.tdjfdzo.mongodb.net:27017/?ssl=true&replicaSet=atlas-14fdng-shard-0&authSource=admin&appName=Cluster0")
.then(()=>console.log("Database connected Successfully"))
.catch((err)=>console.log("Error while connecting to DB", err))

app.listen(5000, ()=>console.log("Server is running on port : 5000"));