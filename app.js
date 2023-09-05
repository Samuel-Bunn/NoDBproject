import express from 'express'
import morgan from 'morgan'
import viteExpress from 'vite-express'
import idGen from './src/utils/idGen.js'


const app = express()
const port = '8000'

app.use(morgan('dev'))
app.use(express.urlencoded({ extended: false }))
app.use(express.static('public'))
app.use(express.json())

viteExpress.config({ printViteDevServerHost: true })

const TEST_TASKS = [
    { id: 0, task: 'feed cat'},
    { id: 1, task: 'walk cat'},
    { id: 2, task: 'clean cat box'},
    { id: 3, task: 'world domination'}
]

const getNewId = idGen(TEST_TASKS.length)


app.get('/api/toDoData', (req,res) => {
    res.json(TEST_TASKS)
})


app.post('/api/toDoData', (req,res) => {
    const { task } = req.body
    const newTask = {
        id: getNewId.next().value,
        task,
    }

    TEST_TASKS.push(newTask)
    res.json(TEST_TASKS)
})

app.post('/api/toDoData/:id/delete', (req,res) => {
    let {id} = req.params
    const index = TEST_TASKS.findIndex((data) => data.id === +id)
    TEST_TASKS.splice(index,1)
    res.json(TEST_TASKS)
})

app.post('/api/toDoData/:id/edit', (req,res) => {
    let {id} = req.params
    let {task} = req.body

    const index = TEST_TASKS.findIndex((data) => data.id === +id)
    const data = TEST_TASKS[index]

    data.task = task ?? data.task
    res.json(data)
})

viteExpress.listen(app,port, () => console.log(`Listening on http://localhost:${port}`))