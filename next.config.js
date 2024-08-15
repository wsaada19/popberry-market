module.exports = () => {
  /**
   * @type {import('next').NextConfig}
   */
  const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'mesh-online-assets.s3.us-east-2.amazonaws.com',
          port: '',
          pathname: '**',
        },
      ],
    },
  };
  return nextConfig;
};
