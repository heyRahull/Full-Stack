import mongoose from 'mongoose';

const todoSchema = ({
    text: {type: String, required: true},
    completed: {type: Boolean, default: false},
    checked: {type: Boolean, default: false},
})

export const Todo = mongoose.model('Todo', todoSchema);