import { Todo } from "../model/todo.model.js"

export const createTodo = async (req, res) => {
    try{
        const createdTodo = await Todo.create(req.body);
        res.status(200).json({
            success: true,
            message: "Successfully created todo entry",
            todo: createdTodo
        })

    }catch(err){
        res.status(500).json({
            success: false,
            message: "Not able to create Todo entry",
            error: err.message
        })
    }
}

export const getAllTodos = async (req, res) => {
    try{
        const getAllTodosData = await Todo.find({});
        res.status(200).json({
            success: true,
            message: "Successfully fetched all todos data",
            todos: getAllTodosData
        })
    }catch(err){
        res.status(500).json({
            success: false,
            message: "Not able to get all Todos data",
            error: err.message
        })
    }
}

export const deleteTodo = async (req, res) => {
    try{
        const {id} = req.params;
        const deletedTodo = await Todo.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            message: "Successfully Deleted Todo",
            todo: deletedTodo
        })
    }catch(err){
        res.status(500).json({
            success: true,
            message: "Not able to delete Todo",
            error: err.message
        })
    }
}

// export const doneTodo = async (req, res) => {
//     try{
//         const {id} = req.params;
//         const doneTodo = await Todo.findByIdAndUpdate(id, req.body, {new:true});
//         res.status(200).json({
//             success: true,
//             message: "Successfully updated Todo",
//             todo: doneTodo
//         })
        
//     }catch(err){
//         res.status(500).json({
//             success: false,
//             message: "Not able to Update Todo",
//             error: err.message
//         })
//     }
// }

export const updateTodo = async (req, res) => {
    try{
        const {id} = req.params;
        const updatedTodo = await Todo.findByIdAndUpdate(id, {$set: req.body}, {returnDocument: 'after', runValidators: true});
        res.status(200).json({
            success: true,
            message:"Successfully updated todo",
            todo: updatedTodo
        })
    }catch(err){
        res.status(500).json({
            success: false,
            message: "Not able to update Todo",
            error: err.message
        })
    }
}