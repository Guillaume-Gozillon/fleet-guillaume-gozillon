import express from 'express'
import cors from 'cors'
import router from './infra/http/router'
import { errorHandler } from './infra/http/middlewares/error'

const app = express()

app.use(cors())
app.use(express.json())
app.use('/api', router)
app.use(errorHandler)

const PORT = process.env.PORT ?? 4000
app.listen(PORT, () => console.log(`api on :${PORT}`))
