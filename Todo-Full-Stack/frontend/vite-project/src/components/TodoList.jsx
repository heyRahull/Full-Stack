import { useState, useEffect } from "react";

/*
Add Task - POST
Display Todos - GET
Delete completed Todos - DELETE
Mark todos as Done - PUT
Edit & Save Todos - PUT
*/
const TodoList = () => {
    const BASE_URL = "http://localhost:5000/api/v1/todo";
    const [todo, setTodo] = useState("");
    const [todos, setTodos] = useState([]);

    useEffect(()=>{
        fetchTodos();
    },[])

    const fetchTodos = async () => {
        const response = await fetch(BASE_URL);
        const data = await response.json();
        // console.log(data);
        setTodos(data.todos)
    }

    const handleAdd = async () => {
        const response = await fetch(BASE_URL, {
            method: "POST",
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({text: todo}),
        });
        const data = await response.json();
        // console.log("new entry added: ", data)
        setTodos([...todos, data.todo]);
        setTodo("")

    }

    const handleDelete = async (deleteId) => {
        const response = await fetch(`${BASE_URL}/${deleteId}`, {
            method: "DELETE",
            headers: {'Content-Type' : 'application/json'},
        });
        const data = await response.json();
        setTodos(todos.filter(todo=>todo._id != deleteId))
    }

    const handleDone = async (doneId) => {
        const response = await fetch(`${BASE_URL}/${doneId}`, {
            method: "PATCH",
            headers: {'Content-Type' : "application/json"},
            body: JSON.stringify({completed: true})
        });
        const data = await response.json();
        setTodos(todos.map(todo=> todo._id === doneId ? {...todo, completed : data.todo.completed} : todo))
        console.log("Done data", data); 
        console.log(todos);
    }

    return(
        <div>
            <h1>Todo List App</h1> <br /><br />

            <input value={todo} onChange={(e)=>setTodo(e.target.value)}/>
            <button onClick={handleAdd}>Add Task</button>

            <br /><br />
            <h2>Your Tasks</h2>
            {
                todos?.map(todo => !todo.completed && <div key={todo._id}>
                    <p style={{display: 'inline'}}>{todo.text}</p>
                    <button onClick={()=>handleDone(todo._id)}>Done</button>
                </div>)
            }


            <br /> <br />

            <h2>Completed Tasks</h2>
            {
                todos?.map(todo=> todo.completed && <div key={todo._id}>
                    <p style={{display: 'inline'}}>{todo.text}</p>
                    <button onClick={()=>handleDelete(todo._id)}>Delete</button>
                </div>)
            }

        </div>
    );
}

export default TodoList;