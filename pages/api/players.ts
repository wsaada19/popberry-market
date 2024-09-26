/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextApiRequest, NextApiResponse } from 'next';

type ResponseData = {
  message: string;
  data: any;
};

const url = 'https://pixels-server.pixels.xyz/v1/player';

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  const { username } = req.query;
  let response;
  if (isHexString(username)) {
    response = await fetch(`${url}?mid=${username}&detail=2&skills=1&guild=1`);
  } else if (isCryptoWallet(username)) {
    response = await fetch(`${url}?cryptoWalletAddress=${username}&detail=2&skills=1&guild=1`);
  } else {
    response = await fetch(`${url}?username=${username}&detail=2&skills=1&guild=1`);
  }

  const playerData = await response.json();
  if (response.status !== 200) {
    return res.status(response.status).json({ message: 'Error', data: playerData });
  }
  res.status(200).json({ message: 'Success!', data: playerData });
}

function isHexString(str) {
  const regex = /^[a-f0-9]{24}$/;
  return regex.test(str);
}

function isCryptoWallet(str) {
  const regex = /^0x[a-fA-F0-9]{40}$/;
  return regex.test(str);
}
