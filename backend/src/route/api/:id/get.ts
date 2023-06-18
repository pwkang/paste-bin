import { Request, Response } from 'express'
import pasteBinService from '../../../services/pasteBin.service'

export default async function getBin(req: Request, res: Response) {
  const { id } = req.params
  const json = await pasteBinService.getJson(id)
  res.json({
    json,
  })
}
