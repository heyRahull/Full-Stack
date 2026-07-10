import express from 'express';
import mongoose from 'mongoose';
import router from './routes/todo.routes.js';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/v1', router);


mongoose.connect('mongodb://rahulag774_db_user:1234Rahul@ac-zykgbeb-shard-00-00.tdjfdzo.mongodb.net:27017,ac-zykgbeb-shard-00-01.tdjfdzo.mongodb.net:27017,ac-zykgbeb-shard-00-02.tdjfdzo.mongodb.net:27017/?ssl=true&replicaSet=atlas-14fdng-shard-0&authSource=admin&appName=Cluster0')
.then(()=>console.log("Database connected successfully"))
.catch((err)=>console.log("Error while connecting to DB: ", err))

app.listen(5000, ()=>{console.log("Server is running on port 5000")})