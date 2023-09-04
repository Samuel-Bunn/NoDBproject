import express from 'express'
import morgan from 'morgan'
import ViteExpress from 'vite-express'
// import idGen from '../utils/idGen.js'


const app = express()
const port = '8000'

app.use(morgan('dev'))
app.use(express.urlencoded({ extended: false }))
app.use(express.static('public'))
app.use(express.json())

ViteExpress.config({ printViteDevServerHost: true })

const TEST_TASKS = 
[
    { id: 1, task: 'feed cat'},
    { id: 2, task: 'walk cat'},
    { id: 3, task: 'clean cat box'},
    { id: 4, task: 'world domination'}
]

// const getNewId = idGen(TEST_TASKS.length)


// app.get('/api/toDoData', (req,res) => {
//     res.json(TEST_TASKS)
// })

ViteExpress.listen(app,port, () => console.log(`Listening on http://localhost:${port}`))