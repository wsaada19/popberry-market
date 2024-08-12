import React from 'react';
import Image from 'next/image';

type Player = {
  guildId: string;
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
    averageRank: number;
    value: number;
  };
};

export type TeamLeaderBoardProps = {
  players: Player[];
  className?: string;
};

export const Leaderboard = ({ players, className, guildId }: TeamLeaderBoardProps) => {
  return (
    <div className={`text-base ${className} h-144 overflow-auto mb-2`}>
      <table className="text-white w-full">
        <thead className="text-base text-white h-10 bg-purple sticky top-0">
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
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {players
            .filter((p) => p.guildId == guildId)
            .map((player, index) => {
              return (
                <tr className="h-11 text-black even:bg-light bg-white" key={player.name}>
                  <td className="pl-4 w-1/12">#{index + 1}</td>
                  <td className="w-10">{`${player.name}`}</td>
                  <td className="w-10 text-center">{player.fert.value.toLocaleString()}</td>
                  <td className="w-10 text-center">{player.goo.value.toLocaleString()}</td>
                  <td className="w-10 text-center">{player.spores.value.toLocaleString()}</td>
                  <td className="w-10 text-center">{player.total.value.toLocaleString()}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};
