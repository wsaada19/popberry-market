import React from 'react';
import { BazarnStats } from '@types';

export type SmallLeaderboardProps = {
  players: BazarnStats[];
  className?: string;
};

export const BazarnLeaderboard = ({ players, className }: SmallLeaderboardProps) => {
  const sortBy = (p: BazarnStats[]) => {
    return p.sort((a, b) => b.score - a.score);
  };
  return (
    <div className={`text-base h-144 overflow-auto w-full ${className}`}>
      <div className="pl-3 pt-2.5 font-semibold my-auto md:tex-sm  text-base text-white h-11 bg-blue-600 sticky top-0">
        {`Barney's Bazarn Top Players`}
      </div>
      <table className="text-white w-full">
        <tbody>
          {sortBy(players)
            .slice(0, 200)
            .map((player, index) => {
              return (
                <tr
                  className="h-11 text-black even:bg-blue-100 bg-white cursor-pointer"
                  key={player.playerId}
                  onClick={() => {
                    window.location.href = `/players/${player.playerId}`;
                  }}
                >
                  <td className="tex-sm pl-4 w-1/12 md:text-base">#{index + 1}</td>
                  <td className="text-sm w-10 md:text-base">{`${player.name}`}</td>
                  <td className="text-sm w-10 text-center md:text-base">
                    {player.score.toLocaleString()}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};
