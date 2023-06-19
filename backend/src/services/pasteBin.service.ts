import { redisClient } from './redis.service'
import ms from 'ms'

const prefix = 'pasteBin:'

const saveJson = async (json: string) => {
  const newId = await getNewId()

  await redisClient.set(prefix + newId, json, {
    PX: ms('1d'),
  })
  return newId
}

const getJson = async (id: string) => {
  const json = await redisClient.get(prefix + id)

  if (!json) return null

  return json
}

const getNewId = async () => {
  // generate random 6 characters
  while (true) {
    const id = Math.random().toString(36).substring(2, 8)

    const isExists = await redisClient.get(prefix + id)

    if (!isExists) return id
  }
}

const pasteBinService = {
  saveJson,
  getJson,
}

export default pasteBinService
