import React from 'react';
import Image from 'next/image';
import { Player } from '@types';

export type TeamLeaderBoardProps = {
  players: Player[];
  className?: string;
  guildId: string;
  selected: string;
};

export const Leaderboard = ({ players, className, guildId }: TeamLeaderBoardProps) => {
  const [selected, setSelected] = React.useState('total');

  const sortBy = (p: Player[]) => {
    switch (selected) {
      case 'guano':
        return p.sort((a, b) => b.fert.value - a.fert.value);
      case 'goo':
        return p.sort((a, b) => b.goo.value - a.goo.value);
      case 'spores':
        return p.sort((a, b) => b.spores.value - a.spores.value);
      case 'wateringCan':
        return p.sort((a, b) => Number(b.wateringCanUse) - Number(a.wateringCanUse));
      case 'pixels':
        return p.sort((a, b) => b.pixelsSpent - a.pixelsSpent);
      case 'total':
        return p.sort((a, b) => b.totalCost - a.totalCost);
      default:
        return p.sort((a, b) => b.totalCost - a.totalCost);
    }
  };

  return (
    <div className={`text-base ${className} max-h-144 overflow-auto w-full`}>
      <table className="text-white w-full">
        <thead className="md:tex-sm  text-base text-white h-11 bg-blue-600 sticky top-0">
          <tr>
            <th></th>
            <th></th>
            <th>
              <Image
                src={`/images/guano.png`}
                height={32}
                width={32}
                alt="Guano"
                onClick={() => setSelected('guano')}
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                  display: 'inline',
                  paddingBottom: '4px',
                  cursor: 'pointer',
                }}
              ></Image>
            </th>
            <th>
              <Image
                src={`/images/goo.png`}
                height={32}
                width={32}
                alt="Goo"
                onClick={() => setSelected('goo')}
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                  display: 'inline',
                  paddingBottom: '4px',
                  cursor: 'pointer',
                }}
              ></Image>
            </th>
            <th>
              <Image
                src={`/images/spores.png`}
                height={32}
                width={32}
                alt="Seeds"
                onClick={() => setSelected('spores')}
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                  display: 'inline',
                  paddingBottom: '4px',
                  cursor: 'pointer',
                }}
              ></Image>
            </th>
            <th className="tex-sm md:text-base lg:text-lg">
              <Image
                src={`/images/watering-can.png`}
                height={32}
                width={32}
                alt="watering can"
                onClick={() => setSelected('wateringCan')}
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                  display: 'inline',
                  paddingBottom: '4px',
                  cursor: 'pointer',
                }}
              ></Image>
            </th>
            <th className="tex-sm md:text-base lg:text-lg">
              <Image
                src={`/images/pixel.webp`}
                height={32}
                width={32}
                alt="Pixels"
                onClick={() => setSelected('pixels')}
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                  display: 'inline',
                  paddingBottom: '4px',
                  cursor: 'pointer',
                }}
              ></Image>
            </th>
            <th className="tex-sm md:text-base lg:text-lg">
              <Image
                src={`/images/coin.webp`}
                height={30}
                width={30}
                alt="coin"
                onClick={() => setSelected('total')}
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                  display: 'inline',
                  cursor: 'pointer',
                  paddingBottom: '2px',
                }}
              ></Image>
            </th>
          </tr>
        </thead>
        <tbody>
          {sortBy(players.filter((p) => p.guildId == guildId)).map((player, index) => {
            return (
              <tr className="h-11 text-black even:bg-light bg-white" key={player.name}>
                <td className="text-xs sm:tex-sm pl-4 w-1/12 md:text-base">#{index + 1}</td>
                <td className="text-xs sm:text-sm w-10 md:text-base">{`${player.name}`}</td>
                <td className="text-xs sm:text-sm w-10 text-center md:text-base">
                  {player.fert.value.toLocaleString()}
                </td>
                <td className="text-xs sm:text-sm w-10 text-center md:text-base">
                  {player.goo.value.toLocaleString()}
                </td>
                <td className="text-xs sm:text-sm w-10 text-center md:text-base">
                  {player.spores.value.toLocaleString()}
                </td>
                <td className="text-xs sm:text-sm w-10 text-center md:text-base">
                  {Number(player.wateringCanUse).toLocaleString()}
                </td>
                <td className="text-xs sm:text-sm w-10 text-center md:text-base">
                  {Number(player.pixelsSpent).toLocaleString()}
                </td>
                <td className="text-xs sm:text-sm w-10 text-center md:text-base">
                  {Number(player.totalCost.toFixed(0)).toLocaleString()}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
