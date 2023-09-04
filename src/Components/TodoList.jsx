import { useState } from 'react'
import './todoList.css'
import idGen from '../utils/idGen.js'

const getNewId = idGen()

const ToDoListHeader = () => {
    return (
        <div id="headerWrapper">
            <h1>TCOB</h1>
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
            <input type="text" value={value} onChange={(e) => onValueChange(e.target.value)} ></input>
        </li>
    ) : (
        <li>{value}</li>
    )
}

const ToDoListRow = ({ initialTasks, onDeleteRow, initialIsEditing }) => {   
    const [isEditMode, setIsEditMode] = useState(initialIsEditing)
    const [task, setTask] = useState(initialTasks) 

    const setEditMode = () => setIsEditMode(true)
    const setNormalMode = () => setIsEditMode(false)
    
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
    const [taskList, setTaskList] = useState(initialTasks)

    const addRow = () => {
        // console.log('hit')
        const newToDoList = [...taskList]
        newToDoList.push({
            id: getNewId.next().value,
            task: '',
            isEditMode: true,
        })
        setTaskList(newToDoList)
    }

    const deleteRow = (id) => {
        const newToDoList = [...taskList]
        const index = newToDoList.findIndex((task) => task.id === id)
        newToDoList.splice(index,1)
        setTaskList(newToDoList)
    }

    const rows = taskList.map(({ id, task, isEditMode }) => (
            <ToDoListRow
            key={id}
            initialTasks={task}
            initialIsEditing={isEditMode}
            onDeleteRow={() => deleteRow(id)}
            />
    ))

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