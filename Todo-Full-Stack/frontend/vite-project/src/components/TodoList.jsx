import { useState, useEffect } from "react";

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
        console.log(data);
        setTodos(data.todos)
    }

    const handleAdd = async () => {
        const response = await fetch(BASE_URL, {
            method: "POST",
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({text: todo}),
        });
        const data = await response.json();
        setTodo("")
    }

    return(
        <div>
            <h1>Todo List App</h1> <br /><br />

            <input value={todo} onChange={(e)=>setTodo(e.target.value)}/>
            <button onClick={handleAdd}>Add Task</button>

            <br /><br />
            <h2>Your Tasks</h2>
            {
                todos.map(todo => !todo.completed && <div key={todo._id}>
                    <p>{todo.text}</p>
                </div>)
            }


            <br /> <br />

            <h2>Completed Tasks</h2>
            {
                todos.map(todo=> todo.completed && <div key={todo._id}>
                    <p>{todo.text}</p>
                </div>)
            }

        </div>
    );
}

export default TodoList;