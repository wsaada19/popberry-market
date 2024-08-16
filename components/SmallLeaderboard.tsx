import React from 'react';
// import Image from 'next/image';
import { Player } from '@types';

type Option = {
  value: string;
  label: string;
};

export type SmallLeaderboardProps = {
  players: Player[];
  className: string;
  selected: Option;
};

export const SmallLeaderboard = ({ players, className, selected }: SmallLeaderboardProps) => {
  const sortBy = (p: Player[]) => {
    switch (selected.value) {
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
      case 'totalCost':
        return p.sort((a, b) => b.totalCost - a.totalCost);
      case 't1Seeds':
        return p.sort((a, b) => b.spores.t1Seeds - a.spores.t1Seeds);
      case 't2Seeds':
        return p.sort((a, b) => b.spores.t2Seeds - a.spores.t2Seeds);
      case 't3Seeds':
        return p.sort((a, b) => b.spores.t3Seeds - a.spores.t3Seeds);
      case 't1Guano':
        return p.sort((a, b) => b.fert.t1Fert - a.fert.t1Fert);
      case 't2Guano':
        return p.sort((a, b) => b.fert.t2Fert - a.fert.t2Fert);
      case 't3Guano':
        return p.sort((a, b) => b.fert.t3Fert - a.fert.t3Fert);
      case 't1Goo':
        return p.sort((a, b) => b.goo.t1Goo - a.goo.t1Goo);
      case 't2Goo':
        return p.sort((a, b) => b.goo.t2Goo - a.goo.t2Goo);
      case 't3Goo':
        return p.sort((a, b) => b.goo.t3Goo - a.goo.t3Goo);
      default:
        return p.sort((a, b) => b.totalCost - a.totalCost);
    }
  };

  const getValue = (player: Player) => {
    switch (selected.value) {
      case 'guano':
        return player.fert.value;
      case 'goo':
        return player.goo.value;
      case 'spores':
        return player.spores.value;
      case 'wateringCan':
        return Number(player.wateringCanUse);
      case 't1Seeds':
        return player.spores.t1Seeds;
      case 't2Seeds':
        return player.spores.t2Seeds;
      case 't3Seeds':
        return player.spores.t3Seeds;
      case 't1Guano':
        return player.fert.t1Fert;
      case 't2Guano':
        return player.fert.t2Fert;
      case 't3Guano':
        return player.fert.t3Fert;
      case 't1Goo':
        return player.goo.t1Goo;
      case 't2Goo':
        return player.goo.t2Goo;
      case 't3Goo':
        return player.goo.t3Goo;
      case 'pixels':
        return player.pixelsSpent;
      case 'totalCost':
        return player.totalCost;
      default:
        return player.totalCost;
    }
  };
  return (
    <div className={`text-base h-144 overflow-auto w-full ${className}`}>
      <div className="pl-3 pt-2.5 font-semibold my-auto md:tex-sm  text-base text-white h-11 bg-blue-600 sticky top-0">
        {`Most ${selected.label}`}
      </div>
      <table className="text-white w-full">
        <tbody>
          {sortBy(players)
            .slice(0, 100)
            .map((player, index) => {
              return (
                <tr className="h-11 text-black even:bg-light bg-white" key={player.name}>
                  <td className="tex-sm pl-4 w-1/12 md:text-base">#{index + 1}</td>
                  <td className="text-sm w-10 md:text-base">{`${player.name}`}</td>
                  <td className="text-sm w-10 text-center md:text-base">
                    {getValue(player).toLocaleString()}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};
