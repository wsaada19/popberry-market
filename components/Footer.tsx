import Link from 'next/link';

export const Footer = (): JSX.Element => {
  return (
    <footer className="mt-4 text-base">
      <hr className="border-gray-300 mb-2" />
      <div className="flex justify-between">
        <Link
          passHref
          className="twitter-follow-button float-right text-xs mt-1"
          href="https://x.com/GamingEtheria"
        >
          Follow me on 𝕏
        </Link>
        <p className="text-xs mt-1">
          Not affiliated with{' '}
          <Link passHref href="https://play.pixels.xyz">
            Pixels Online
          </Link>
        </p>
      </div>
    </footer>
  );
};
