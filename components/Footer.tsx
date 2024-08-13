import Link from 'next/link';

export const Footer = (): JSX.Element => {
  return (
    <footer className="mt-4 text-base">
      <hr className="border-gray-300 mb-2" />
      <p className="text-sm mb-2">
        *Cost is estimated assuming that players used T2 spores, goo and fertilizer for 500 coins.
      </p>
      <p className="text-sm mb-2">
        **If players stopped pledging their shard after the event they may not be reflected in the
        data.
      </p>
      <p className="text-sm mb-2">
        Not affiliated with{' '}
        <Link passHref href="https://play.pixels.xyz">
          Pixels
        </Link>
      </p>
      <span className="flex float-right">
        {/* <Link passHref className="px-2" href="https://github.com">
          <Image
            src="/images/github.svg"
            height={24}
            width={24}
            alt="Github logo"
            style={{
              maxWidth: '100%',
              height: 'auto',
            }}
          ></Image>
        </Link> */}
        <Link passHref className="twitter-follow-button" href="https://x.com/GamingEtheria">
          @x
        </Link>
      </span>
    </footer>
  );
};
