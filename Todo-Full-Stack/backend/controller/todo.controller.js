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