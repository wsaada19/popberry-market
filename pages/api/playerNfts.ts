/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextApiRequest, NextApiResponse } from 'next';
import { fetchPlayerNFTs } from '@services/opensea/getPlayerNfts';

type ResponseData = {
  message: string;
  data: any;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  const { wallet } = req.query;
  const wallets = Array.isArray(wallet) ? wallet : [wallet];
  const nftData = await fetchPlayerNFTs(wallets);
  res.status(200).json({ message: 'Success!', data: nftData.nfts });
}
