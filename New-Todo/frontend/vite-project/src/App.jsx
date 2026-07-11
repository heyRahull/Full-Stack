import { useState, useEffect } from "react"

function App() {

  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(()=>{
    fetchTodos();
  }, [])


  const fetchTodos = async () => {
    const response = await fetch("http://localhost:5000/api/v1/task", {
      method: "GET",
      headers: {'Content-Type':'application/json'},

    });
    const data = await response.json();
    // console.log(data);
    setTodos(data.todo);
  }

  const addTask = async () => {
    const response = await fetch("http://localhost:5000/api/v1/task", {
      method: "POST",
      headers: {'Content-Type' : 'application/json'},
      body: JSON.stringify({"text" : todo})
    });
    const data = await response.json();
    console.log(data)
    setTodos([...todos, data.todo])
    setTodo("");
  }

  return (
    <div>
      <h1>Todo List App</h1>
      <br /><br />
      <input value={todo} onChange={(e)=>setTodo(e.target.value)}type="text" />
      <button onClick={addTask}>Add Task</button> <br /><br />

      <h2>Your Tasks</h2> 
      {todos.map((todo)=>{return <div key={todo._id}>{todo.text}</div>})}

      <br /><br />
      <h2>Completed Tasks</h2>

    </div>
  )
}

export default App
