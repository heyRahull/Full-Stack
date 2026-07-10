import { Task } from "../models/todo.model.js"

export const createTask = async (req, res) => {
    try{
        const addedTask = await Task.create(req.body);
        res.status(200).json({
            success: true,
            message: "Task added Successfully",
            todo: addedTask
        })
    }catch(err){
        res.status(500).json({
            success: false,
            message: "Not able to add Task.",
            error: e.json
        })
    }
}

export const getAllTasks = async (req, res) => {
try{
    // const {id} = req.params
    const allTasks = await Task.find({})
    res.status(200).json({
        success: true,
        message: "Successfully fetched all tasks",
        todo: allTasks
    })

}catch(err){
res.status(500).json({
    success: false,
    message: "not able to Successfully get all tasks",
    error: err.message
})
}
}