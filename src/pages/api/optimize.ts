// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { UppyFile } from '@uppy/core'
import type { NextApiRequest, NextApiResponse } from 'next'
import { optimize, OptimizedSvg } from 'svgo'

type Data = {
  svg: string;
  size: number;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== 'POST' || !req.body) {
    res.status(400).end();
  }
  const files = JSON.parse(req.body)
  const optimizedSvg = optimize(files[0].svg) as OptimizedSvg;
  res.status(200).json({ svg: optimizedSvg.data, size: Buffer.byteLength(optimizedSvg.data, 'utf-8') })
}
