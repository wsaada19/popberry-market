module.exports = () => {
  /**
   * @type {import('next').NextConfig}
   */
  const nextConfig = {
    images: {
      domains: ['images.ctfassets.net'],
    },
  };
  return nextConfig;
};
