import express from 'express'
import morgan from 'morgan'
import ViteExpress from 'vite-express'

const app = express()
const port = '8000'

app.use(morgan('dev'))
app.use(express.urlencoded({ extended: false }))
app.use(express.static('public'))
app.use(express.json())

ViteExpress.config({ printViteDevServerHost: true })

ViteExpress.listen(app,port, () => console.log(`Listening on http://localhost:${port}`))