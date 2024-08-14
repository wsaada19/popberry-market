import Link from 'next/link';

export const Footer = (): JSX.Element => {
  return (
    <footer className="mt-4 text-base">
      <hr className="border-gray-300 mb-2" />
      <span className="flex justify-between">
        <p className="text-sm mb-2 mt-2">
          Not affiliated with{' '}
          <Link passHref href="https://play.pixels.xyz">
            Pixels Online
          </Link>
        </p>
        <Link
          passHref
          className="twitter-follow-button float-right"
          href="https://x.com/GamingEtheria"
        >
          Follow me on 𝕏
        </Link>
      </span>
    </footer>
  );
};
