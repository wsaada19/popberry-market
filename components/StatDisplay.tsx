import Image from 'next/image';

type StatDisplayProps = {
  value: string;
  type: string;
  icon?: 'pixel' | 'coin';
  tooltip?: string;
};

export const StatDisplay = ({ value, type, icon }: StatDisplayProps) => {
  const getIcon = () => {
    if (icon == 'pixel') {
      return (
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
        />
      );
    } else if (icon == 'coin') {
      return (
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
        />
      );
    } else {
      return <></>;
    }
  };
  return (
    <span>
      <div className="text-lg text-center md:text-xl font-bold">
        {icon ? getIcon() : <></>}
        {value}
      </div>
      <div className="text-center text-xs">{type}</div>
    </span>
  );
};
