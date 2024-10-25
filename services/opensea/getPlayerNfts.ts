import collectionData from './collections.json';

export type NftData = {
  identifier: string;
  collection: string;
  contract: string;
  token_standard: string;
  name: string;
  description: string;
  image_url: string;
  display_image_url: string;
  display_animation_url: string;
  metadata_url: string;
  opensea_url: string;
  updated_at: string;
  is_disabled: boolean;
  is_nsfw: boolean;
};

// Function to check if the collection is a Pixels collection
function isPixelsCollection(collection: string): boolean {
  for (const col of collectionData) {
    if (col.collection_data.collection === collection) {
      return true;
    }
  }
  return false;
}

const headers = {
  accept: 'application/json',
  'x-api-key': process.env.OPENSEA_API_KEY,
};

async function fetchNFTs(walletAddress: string, chain: string): Promise<NftData[]> {
  const collectValues: NftData[] = [];
  const url = `https://api.opensea.io/api/v2/chain/${chain}/account/${walletAddress}/nfts`;

  try {
    const response = await fetch(url, { headers, next: { revalidate: 3600 * 4 } });
    const json = await response.json();
    const nfts = json.nfts;
    for (const nft of nfts) {
      if (isPixelsCollection(nft.collection)) {
        collectValues.push(nft);
      }
    }
    return collectValues;
  } catch (error) {
    console.error(`Error fetching NFTs for ${walletAddress} on ${chain}`, error);
    return collectValues;
  }
}

// Example usage to fetch player NFTs
export async function fetchPlayerNFTs(wallets: string[]): Promise<{ nfts: NftData[] }> {
  const chains = ['ethereum', 'matic'];
  const playerNFT = { nfts: [] };

  for (const wallet of wallets) {
    for (const chain of chains) {
      const res = await fetchNFTs(wallet, chain);
      playerNFT.nfts.push(...res);
    }
  }

  return playerNFT;
}
