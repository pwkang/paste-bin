import express from 'express'
import createBin from './route/api/create/post'
import getBin from './route/api/:id/get'
import { redisClient } from './services/redis.service'
import cors from 'cors'

const app = express()
app.use(express.json())
app.use(
  cors({
    origin: '*',
  })
)

app.post('/api/create', createBin)

app.get('/api/:id', getBin)

redisClient.connect().then(() => {
  app.listen(8080, () => console.log('Listening on port 8080'))
})
