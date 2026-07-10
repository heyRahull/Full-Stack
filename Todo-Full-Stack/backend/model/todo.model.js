import mongoose from "mongoose"

const todoSchema = new mongoose.Schema({
    text: {type:String, required: true, minLength: 5},
    completed: {type: Boolean, default: false},
    checked: {type: Boolean, default: false}, 
});

export const Todo = mongoose.model('Todo', todoSchema);