import React from 'react';

export type LeaderboardEntry = {
  playerId: string;
  name: string;
  scores: number[];
};

export type SmallLeaderboardProps = {
  players: LeaderboardEntry[];
  labels: string[];
  className?: string;
};

export const Leaderboard = ({ players, className, labels }: SmallLeaderboardProps) => {
  const sortBy = (p: LeaderboardEntry[]) => {
    return p.sort((a, b) => {
      if (b.scores[0] === a.scores[0] && b.scores.length > 1) {
        return b.scores[1] - a.scores[1];
      }
      return b.scores[0] - a.scores[0];
    });
  };
  return (
    <div className={`text-base h-144 overflow-auto w-full ${className}`}>
      <table className="text-white w-full">
        <thead className="text-white h-11 bg-blue-600 sticky top-0 text-left">
          <tr>
            <th className="text-sm pl-4 w-1/12 md:text-base"></th>
            <th className="text-sm w-10 md:text-base">Player</th>
            {labels.map((label) => (
              <th className="text-sm w-10 text-center md:text-base" key={label}>
                {label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortBy(players).map((player, index) => {
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
                {player.scores.map((score, i) => (
                  <td className="text-sm w-10 text-center md:text-base" key={i}>
                    {score.toLocaleString()}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
