import './App.css'
import ToDoList from './Components/TodoList.jsx'


function App ({initialTasks}) {
    console.log(initialTasks)
    return  <ToDoList initialTasks = {initialTasks} />  
}

export default App