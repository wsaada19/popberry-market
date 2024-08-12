import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const playerName = req.query?.name || 'Unknown Player';
  res.status(200).json({ name: playerName });
}
