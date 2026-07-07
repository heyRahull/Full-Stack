import mongoose from "mongoose"
import bcrypt from 'bcrypt';

const employeeSchema = new mongoose.Schema({
    username: String,
    email: String,
    role: String,
    avatarUrl: String,
    password: {type: String, required: true}
});

employeeSchema.pre("save", async function () {
    if(!this.isModified("password")) return;

    try{
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt)

    }catch(err){
        throw new Error(err.message);
    }
})

export const Employee = mongoose.model('Employee', employeeSchema);