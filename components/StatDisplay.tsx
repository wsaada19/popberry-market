import Image from 'next/image';

export const StatDisplay = ({ value, type }: { value: string; type: string }) => {
  return (
    <span>
      <div className="text-lg text-center md:text-xl font-bold">
        {type == 'Earnings' || type == 'Pixels spent' ? (
          <Image
            src={`/images/pixel.webp`}
            height={24}
            width={24}
            alt="Pixel"
            style={{
              maxWidth: '100%',
              height: 'auto',
              display: 'inline',
              paddingBottom: '4px',
              paddingRight: '4px',
            }}
          ></Image>
        ) : (
          <></>
        )}
        {type == 'Coins spent' || type == 'Cost estimate*' ? (
          <Image
            src={`/images/coin.webp`}
            height={24}
            width={24}
            alt="Coin"
            style={{
              maxWidth: '100%',
              height: 'auto',
              display: 'inline',
              paddingBottom: '4px',
              paddingRight: '4px',
            }}
          ></Image>
        ) : (
          <></>
        )}
        {value}
      </div>
      <div className="text-center text-xs">{type}</div>
    </span>
  );
};
