import React from 'react';
import Image from 'next/image';

export type Player = {
  guildId: string;
  totalCost: number;
  totalRank?: number;
  name: string;
  id: string;
  fert: {
    value: number;
    rank: number;
  };
  goo: {
    value: number;
    rank: number;
  };
  spores: {
    value: number;
    rank: number;
  };
  total: {
    rank: number;
    value: number;
  };
};

export type TeamLeaderBoardProps = {
  players: Player[];
  className?: string;
  guildId: string;
  selected: string;
};

export const Leaderboard = ({ players, className, guildId }: TeamLeaderBoardProps) => {
  return (
    <div className={`text-base ${className} h-144 overflow-auto w-full`}>
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
                alt="Github logo"
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                  display: 'inline',
                  paddingBottom: '4px',
                }}
              ></Image>
            </th>
            <th>
              <Image
                src={`/images/goo.png`}
                height={32}
                width={32}
                alt="Github logo"
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                  display: 'inline',
                  paddingBottom: '4px',
                }}
              ></Image>
            </th>
            <th>
              <Image
                src={`/images/spores.png`}
                height={32}
                width={32}
                alt="Github logo"
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                  display: 'inline',
                  paddingBottom: '4px',
                }}
              ></Image>
            </th>
            <th className="tex-sm md:text-base lg:text-lg">Total</th>
            <th className="tex-sm md:text-base lg:text-lg">
              Cost{'* '}
              <Image
                src={`/images/coin.webp`}
                height={18}
                width={18}
                alt="coin"
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                  display: 'inline',
                  paddingBottom: '4px',
                }}
              ></Image>
            </th>
          </tr>
        </thead>
        <tbody>
          {players
            .filter((p) => p.guildId == guildId)
            .sort((a, b) => b.total.value - a.total.value)
            .map((player, index) => {
              return (
                <tr className="h-11 text-black even:bg-light bg-white" key={player.name}>
                  <td className="tex-sm pl-4 w-1/12 text-base md:text-base">#{index + 1}</td>
                  <td className="text-sm w-10 md:text-base">{`${player.name}`}</td>
                  <td className="text-sm w-10 text-center md:text-base">
                    {player.fert.value.toLocaleString()}
                  </td>
                  <td className="text-sm w-10 text-center md:text-base">
                    {player.goo.value.toLocaleString()}
                  </td>
                  <td className="text-sm w-10 text-center md:text-base">
                    {player.spores.value.toLocaleString()}
                  </td>
                  <td className="text-sm w-10 text-center md:text-base">
                    {player.total.value.toLocaleString()}
                  </td>
                  <td className="text-sm w-10 text-center md:text-base">
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
