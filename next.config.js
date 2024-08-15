module.exports = () => {
  /**
   * @type {import('next').NextConfig}
   */
  const nextConfig = {
    images: {
      domains: ['images.ctfassets.net', 'mesh-online-assets.s3.us-east-2.amazonaws.com'],
    },
  };
  return nextConfig;
};
