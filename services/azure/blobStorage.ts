import { BlobServiceClient } from '@azure/storage-blob';
import cacheData from 'memory-cache';
import * as Azure from '@azure/storage-blob';

export const getBlobStorageFile = async (containerName, blobName) => {
  const cacheKey = `${containerName}/${blobName}`;
  const value = cacheData.get(cacheKey);
  if (value) {
    return value;
  }
  const accountName = process.env.AZURE_STORAGE_NAME;
  const accountKey = process.env.AZURE_STORAGE_ACCOUNT_KEY;

  const blobServiceClient = new BlobServiceClient(
    `https://${accountName}.blob.core.windows.net`,
    new Azure.StorageSharedKeyCredential(accountName, accountKey)
  );

  const containerClient = blobServiceClient.getContainerClient(containerName);
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);

  try {
    const downloadBlockBlobResponse = await blockBlobClient.download(0);
    const downloaded = await streamToBuffer(downloadBlockBlobResponse.readableStreamBody);
    const jsonResult = JSON.parse(downloaded.toString());

    // get last modified date
    const properties = await blockBlobClient.getProperties();
    const lastModified = properties.lastModified.toISOString();
    const result = { results: jsonResult, lastModified: lastModified };
    cacheData.put(cacheKey, result, 1000 * 60 * 60);
    return result;
  } catch (err) {
    console.error('Error downloading blob:', err.message);
  }
};

// Helper function to convert a ReadableStream to a Buffer
async function streamToBuffer(readableStream) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    readableStream.on('data', (chunk) => {
      chunks.push(chunk);
    });
    readableStream.on('error', reject);
    readableStream.on('end', () => {
      resolve(Buffer.concat(chunks));
    });
  });
}
