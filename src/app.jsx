import './App.css'
import ToDoList from './Components/Todolist'


function App ({initialTasks}) {
    return  <ToDoList initialTasks = {initialTasks} />  
}

export default App