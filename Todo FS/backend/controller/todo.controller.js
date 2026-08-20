import { Todo } from "../model/todo.model.js"


export const createTodo = async (req, res) => {
    try{
        const createdTodo = await Todo.create(req.body);
        res.status(200).json({
            success: true,
            message: "Successfully created Todo",
            todo: createdTodo
        })
    }catch(err){
        res.status(500).json({
            success: false,
            message: "Error While creating Todo",
            error: err.message
        })
    }

}

export const getAllTodo = async (req, res) => {
    try{
        const allTodosData = await Todo.find({});
        res.status(200).json({
            success: true,
            message: "Successfullt Fetched all Todos",
            todos: allTodosData
        })

    }catch(err){
        res.status(500).json({
            success: false,
            message: "Error While fetching all Todos",
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
            message: "Successfully deleted Todo",
            todo: deletedTodo
        })
    }catch(err){
        res.status(500).json({
            success: false,
            message: "Error While deleting Todo",
            error: err.message
        })
    }
}

export const updateTodo = async (req, res) => {
    try{
        const {id} = req.params;
        const updatedTodo = await Todo.findByIdAndUpdate(id, {$set: req.body}, {returnDocument: 'after', runValidators: true});
        res.status(200).json({
            success: true,
            message: "Successfully updated Todo",
            todo: updatedTodo 
        })

    }catch(err){
        res.status(500).json({
            success: false,
            message: "Error While updating Todo",
            error: err.message
        })
    }
}