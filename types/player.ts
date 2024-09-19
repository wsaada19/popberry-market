export type Player = {
  guildId: string;
  totalCost: number;
  totalRank?: number;
  pixelsSpent: number;
  name: string;
  id: string;
  wateringCanUse: string;
  wateringCanRank: number;
  fert: {
    value: number;
    rank: number;
    t1Fert: number;
    t2Fert: number;
    t3Fert: number;
  };
  goo: {
    value: number;
    rank: number;
    t1Goo: number;
    t2Goo: number;
    t3Goo: number;
  };
  spores: {
    value: number;
    rank: number;
    t1Seeds: number;
    t2Seeds: number;
    t3Seeds: number;
  };
  total: {
    rank: number;
    value: number;
  };
};

export type BazarnStats = {
  player: { _id: string; username: string };
  value: number;
  rank: number;
  reward: number;
};
