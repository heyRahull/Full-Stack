import { useState, useEffect } from "react";

const TodoList = () => {
    const [todo, setTodo] = useState("");
    const [todos, setTodos] = useState([]);
    const [editIndex, setEditIndex] = useState(null);
    const [editTodo, setEditTodo] = useState("");

    useEffect(()=> {
        const fetchAllTodos = async () => {
            const res = await fetch("http://localhost:5000/api/v1/todo");
            const data = await res.json();
            // console.log(data);
            setTodos(data.todos)
        }
        fetchAllTodos();
    }, [])

    const handleAdd = async () => {
        if(todo.trim()=="")return;
        const res = await fetch("http://localhost:5000/api/v1/todo",{
            method: 'POST',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({text: todo})
        });
        const data = await res.json();
        // console.log(data);
        setTodos([...todos, data.todo]);
        setTodo("");
    }

    const handleDone = async (doneId) => {
        const res = await fetch(`http://localhost:5000/api/v1/todo/${doneId}`, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({completed: true})
        })
        const data = await res.json();
        // console.log(data);
        setTodos(todos.map(todo=> todo._id===doneId ? {...todo, completed: data.todo.completed}: todo))

    }

    const handleDelete = async (deletedId) => {
        const res = await fetch(`http://localhost:5000/api/v1/todo/${deletedId}`, {
            method: 'DELETE',
            headers : {'Content-Type' : 'application/json'}
        })
        const data = await res.json();
        // console.log(data);
        setTodos(todos.filter(todo=>todo._id!=deletedId))

    }

    const handleEdit = (editId) => {
        setEditIndex(editId);
        setEditTodo(todos.find(todo=>todo._id===editId).text)
    }

    const handleSave = async (saveId) => {
        setEditIndex(null);
        const res = await fetch(`http://localhost:5000/api/v1/todo/${saveId}`, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({text: editTodo})
        }) 
        const data = await res.json();
        console.log(data);
        setTodos(todos.map(todo=> todo._id === saveId ? {...todo, text: data.todo.text} : todo))
    }

    const handleToggle = async (toggleId) => {
        const toggledTodo = todos.find(todo => todo._id === toggleId);
        const res = await fetch(`http://localhost:5000/api/v1/todo/${toggleId}`, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({checked: !toggledTodo.checked})
        });
        const data = await res.json()
        // console.log(data);
        setTodos(todos.map(todo=> todo._id === toggleId ? {...todo, checked: data.todo.checked} : todo))
    }

    return(
        <div>
            <h1>Todo List Component</h1>
            <input value={todo} onChange={(e)=>setTodo(e.target.value)}/>
            <button onClick={handleAdd}>Add Task</button>
            <h2>Your Tasks</h2>
            {todos.map(todo=>!todo.completed && <div key={todo._id}>
                <input type="checkbox" checked={todo.checked} onChange={()=>handleToggle(todo._id)}/>
                {todo._id === editIndex ?<input value={editTodo} onChange={(e)=>setEditTodo(e.target.value)}/> :<p style={{display: 'inline', textDecoration: todo.checked && 'line-through'}}>{todo.text}</p>}
                {todo._id===editIndex ? <button onClick={()=>handleSave(todo._id)}>Save</button> : <button onClick={()=>handleEdit(todo._id)}>Edit</button>}
                <button onClick={()=>handleDone(todo._id)}>Done</button>
                <button onClick={()=>handleDelete(todo._id)}>Delete</button>
            </div>)}

            <h2>Completed Tasks</h2>
            {todos.map(todo=>todo.completed && <div key={todo._id}>
                <p style={{display: 'inline'}}>{todo.text}</p>
                <button onClick={()=>handleDelete(todo._id)}>Delete</button>
            </div>)}

        </div>
    );
}

export default TodoList;