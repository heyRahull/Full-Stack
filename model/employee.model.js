import mongoose from "mongoose"

const employeeSchema = new mongoose.Schema({
    username: String,
    email: String,
    role: String,
    avatarUrl: String
});

export const Employee = mongoose.model('Employee', employeeSchema);