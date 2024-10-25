module.exports = () => {
  /**
   * @type {import('next').NextConfig}
   */
  const nextConfig = {
    staticPageGenerationTimeout: 1000,
    images: {
      domains: [
        'mesh-online-assets.s3.us-east-2.amazonaws.com',
        'pixelsguildwar.com',
        'i.seadn.io',
        'pixels-server.pixels.xyz',
      ],
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
        {
          protocol: 'https',
          hostname: 'i.seadn.io',
          port: '',
          pathname: '**',
        },
        {
          protocol: 'https',
          hostname: 'pixels-server.pixels.xyz',
          port: '',
          pathname: '**',
        },
      ],
    },
  };
  return nextConfig;
};
