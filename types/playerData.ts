export type LevelData = {
  level: number;
  exp?: number;
  totalExp?: number;
};

export type PlayerLevels = {
  forestry: LevelData;
  woodwork: LevelData;
  cooking: LevelData;
  mining: LevelData;
  exploration: LevelData;
  farming: LevelData;
  stoneshaping: LevelData;
  petcare: LevelData;
  business: LevelData;
  metalworking: LevelData;
};

export type Currencies = {
  coins: number;
  pixels: number;
};

export type CropWarsEvent = {
  eventId: string;
  guildId: string;
  fert: {
    value: number;
    rank: number;
    t3Fert: number;
    t2Fert: number;
    t1Fert: number;
  };
  goo: {
    rank: number;
    value: number;
    t3Goo: number;
    t2Goo: number;
    t1Goo: number;
  };
  spores: {
    value: number;
    rank: number;
    t3Seeds: number;
    t2Seeds: number;
    t1Seeds: number;
  };
  total: {
    value: number;
    rank: number;
  };
  costs: {
    totalCost: number;
    pixelsSpent: number;
  };
  watering: {
    wateringCanRank: number;
    wateringCanUse: string;
  };
};

export type IndividualEvent = {
  eventId: string;
  score: number;
  rank: number;
  costEstimate: number;
  reward: number;
};

export type PlayerData = {
  id: string;
  playerId: string;
  name: string;
  guildId: string;
  cropWarsEvents: CropWarsEvent[];
  individualEvents: IndividualEvent[];
};
