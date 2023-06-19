import { Request, Response } from 'express'
import pasteBinService from '../../../services/pasteBin.service'
import * as dotenv from 'dotenv'

dotenv.config()

interface IRequestBody {
  json: any
}

export default async function createBin(req: Request, res: Response) {
  const { json } = req.body as IRequestBody
  if (typeof json !== 'string') {
    return res.status(400).json({
      error: 'json must be stringified json',
    })
  }

  const id = await pasteBinService.saveJson(json)

  const url = `${process.env.FRONTEND_URL}/${id}`
  res.json({
    url,
  })
}
