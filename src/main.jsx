import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './App.css'
import axios from 'axios'


axios.get('/api/toDoData').then( ({data}) => {
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App initialTasks={data}/>
  </React.StrictMode>,
)
})