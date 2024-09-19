import Image from 'next/image';
import { useState } from 'react';

type StatDisplayProps = {
  value: string;
  type: string;
  icon?: 'pixel' | 'coin';
  tooltip?: string;
};

export const StatDisplay = ({ value, type, icon, tooltip }: StatDisplayProps) => {
  const [tooltipVisible, setTooltipVisible] = useState(false);
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
    <span
      onMouseOver={() => {
        setTooltipVisible(true);
      }}
      onMouseLeave={() => {
        setTooltipVisible(false);
      }}
    >
      <div className="text-lg text-center md:text-xl font-bold relative">
        {icon ? getIcon() : <></>}
        {value}
        {tooltip && (
          <div
            id="tooltip-default"
            role="tooltip"
            className={`absolute z-10${
              tooltipVisible ? 'visible opacity-100' : 'invisible opacity-0'
            } inline-block left-1/2 top-0 transform -translate-x-1/2 -translate-y-full px-4 py-3 text-sm font-medium text-white transition-opacity duration-100 rounded-lg shadow-sm tooltip bg-blue-800`}
          >
            {tooltip}
          </div>
        )}
      </div>
      <div className="text-center text-xs">{type}</div>
    </span>
  );
};
