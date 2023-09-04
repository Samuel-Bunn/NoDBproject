import './App.css'
import ToDoList from './Components/Todolist'

const TEST_TASKS = 
[
    { id: 1, task: 'feed cat'},
    { id: 2, task: 'walk cat'},
    { id: 3, task: 'clean cat box'},
    { id: 4, task: 'world domination'}
]

function App ( ) {
    return  <ToDoList initialTasks = {TEST_TASKS} />  
}

export default App