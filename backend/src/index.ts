import express from 'express'
import createBin from './route/api/create/post'
import getBin from './route/api/:id/get'
import { redisClient } from './services/redis.service'
import cors from 'cors'
import * as dotenv from 'dotenv'

dotenv.config()

const PORT = process.env.PORT || 8080

const app = express()
app.use(express.json({ limit: '50mb' }))
app.use(
  cors({
    origin: '*',
  })
)

app.post('/api/create', createBin)

app.get('/api/:id', getBin)

redisClient.connect().then(() => {
  app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
})
