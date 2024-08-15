module.exports = () => {
  /**
   * @type {import('next').NextConfig}
   */
  const nextConfig = {
    images: {
      domains: ['mesh-online-assets.s3.us-east-2.amazonaws.com', 'pixelsguildwar.com'],
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'mesh-online-assets.s3.us-east-2.amazonaws.com',
          port: '',
          pathname: '**',
        },
        {
          protocol: 'https',
          hostname: 'pixelsguildwar.com/',
          port: '',
          pathname: '**',
        },
      ],
    },
  };
  return nextConfig;
};
