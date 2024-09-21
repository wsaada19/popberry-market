import Link from 'next/link';
import { Switch } from './switch/Switch';

export const Footer = (): JSX.Element => {
  return (
    <footer className="mt-4 text-base">
      <hr className="border-gray-300 mb-2" />
      <div className="flex justify-between mb-1">
        <Link
          passHref
          className="twitter-follow-button float-right text-xs font-semibold mt-1"
          href="https://x.com/GamingEtheria"
        >
          Follow me on 𝕏
        </Link>
        <span className="text-xs block float-right ">
          <Switch className="px-2 mt-2" />
        </span>
      </div>
      <p className="text-xs">
        Not affiliated with{' '}
        <Link className="font-semibold" passHref href="https://play.pixels.xyz">
          Pixels Online
        </Link>
      </p>
    </footer>
  );
};
