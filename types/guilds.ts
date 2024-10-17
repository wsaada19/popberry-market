export type Guild = {
  value: string;
  label: string;
  emblem: string;
  score: number;
  totalRank: number;
  earnings: number;
  bracket: string;
  rank: number;
  stats: {
    t1Seeds: number;
    t2Seeds: number;
    t3Seeds: number;
    t1Goo: number;
    t2Goo: number;
    t3Goo: number;
    t1Fert: number;
    t2Fert: number;
    t3Fert: number;
    wateringCanUse: number;
    pixelsSpent: number;
    coinsSpent: number;
  };
};
