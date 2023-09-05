import { useState } from 'react'
import './todoList.css'
import idGen from '../utils/idGen.js'
import axios from 'axios'


const ToDoListHeader = () => {
    return (
        <div id="headerWrapper">
            <h1>T.C.O.B.</h1>
            <h4>Take Care Of Business</h4>
        </div>
    )
}

const EditableRowModeButtons = ({isEditMode, onDeleteClick, onEditClick, onSaveClick}) => {
    return isEditMode ? (
        <div>
            <button onClick={onSaveClick}>Save</button>
        </div>
    ) : (
        <div>
            <button onClick={onEditClick}>Edit</button>
            <button onClick={onDeleteClick}>Completed</button>
        </div>
    )
}

const EditableTaskCell = ( {value, isEditMode, onValueChange} ) => {
    return isEditMode ? (
        <li>
            <span>
                <input type="text" value={value} onChange={(e) => onValueChange(e.target.value)} ></input>
            </span>
        </li>
    ) : (
        <li>{value}</li>
    )
}

const ToDoListRow = ({ initialTasks, onDeleteRow, initialIsEditing }) => {   
    const [isEditMode, setIsEditMode] = useState(initialIsEditing)
    const [task, setTask] = useState(initialTasks.task) 
    
    const setEditMode = () => setIsEditMode(true)
    // const setNormalMode = () => setIsEditMode(false)
    const setNormalMode = async () => {
        const {data} = await axios.post(`/api/toDoData/${initialTasks.id}/edit`, {
            task,
            
        })

        setTask(data.task)
        setIsEditMode(false)
    }
    
    return(
        <div>    
            <span>
                <EditableTaskCell
                value={task}
                isEditMode={isEditMode}
                onValueChange={setTask} />

            </span>
                 
                <EditableRowModeButtons
                isEditMode={isEditMode}
                onEditClick={setEditMode}
                onSaveClick={setNormalMode}
                onDeleteClick={onDeleteRow} />
                
        </div>
    )
}


const ToDoListAddButton = ({ onClick }) => {
        return (
            <div id="idButtonWrapper">
                <button onClick={onClick}>Add</button>
            </div>
        )
    }


const ToDoList = ( {initialTasks} ) => {
    // console.log(initialTasks)
    const [taskList, setTaskList] = useState(initialTasks)
    // console.log(taskList)
    const getNewId = idGen(taskList.length)
        // console.log(taskList)
    const addRow =  async () => {
        // console.log('hit')
        const { data } = await axios.post('/api/toDoData', {
            task:'enter task here',
        })
        // console.log(data)
        data[data.length - 1].isEditMode = true
        // isEditMode = true
        // const newToDoList = [...taskList]
        // newToDoList.push({
        //     id: getNewId.next().value,
        //     task: '',
        //     isEditMode: true,
        // })
        setTaskList(data)
    }

    const deleteRow = async (id) => {
        // const newToDoList = [...taskList]
        // const index = newToDoList.findIndex((task) => task.id === id)
        // newToDoList.splice(index,1)
        let {data} = await axios.post(`/api/toDoData/${id}/delete`)
        setTaskList(data)
    }

    const rows = taskList.map(({ id, task, isEditMode }) => {
        return(
            <ToDoListRow
            key={id}
            initialTasks={{task, id}}
            initialIsEditing={isEditMode}
            onDeleteRow={() => deleteRow(id)}
            />
        )
        })

    return (
        <>
        <header>
                <ToDoListHeader/>
        </header>

        <main>
            <ol>
               {rows}
            </ol>
        </main>

        <footer>
                <ToDoListAddButton onClick={addRow} />
        </footer>
        </>
        )
}

export default ToDoList