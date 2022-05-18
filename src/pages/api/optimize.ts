import type { NextApiRequest, NextApiResponse } from 'next'
import { optimize, OptimizedSvg } from 'svgo'
import { Data } from '../../shared/types';

type Error = {
  error: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data[] | Error>
) {
  if (req.method !== 'POST' || !req.body) {
    res.status(400).json({ error: 'invalid request' })
  }
  const files = JSON.parse(req.body) as Data[];
  const result: Data[] = files.map(file => {
    const optimizedSvg = optimize(file.svg) as OptimizedSvg;
    return {
      id: file.id,
      name: file.name,
      svg: optimizedSvg.data,
      size: Buffer.byteLength(optimizedSvg.data, 'utf-8')
    }
  })
  res.status(200).json(result)
}
