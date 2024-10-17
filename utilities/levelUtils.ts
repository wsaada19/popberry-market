import { LevelData, PlayerLevels } from '../types';

export const getLevelFromObject = (obj: LevelData) => {
  return [obj.level, obj.totalExp];
};

export const convertData = (obj: PlayerLevels) => {
  const newObj = {};
  Object.keys(obj).forEach((key) => {
    newObj[key] = getLevelFromObject(obj[key]);
  });
  return newObj;
};

export const getTotalLevel = (levels: { [key: string]: PlayerLevels }) => {
  const keys = Object.keys(levels);
  const key = keys[keys.length - 1];
  const totalLevel =
    (levels[key].farming?.level || 0) +
    (levels[key].mining?.level || 0) +
    (levels[key].petcare?.level || 0) +
    (levels[key].stoneshaping?.level || 0) +
    (levels[key].woodwork?.level || 0) +
    (levels[key].metalworking?.level || 0) +
    (levels[key].business?.level || 0) +
    (levels[key].cooking?.level || 0) +
    (levels[key].forestry?.level || 0) +
    (levels[key].exploration?.level || 0);
  return totalLevel;
};

export const getTotalExp = (levels: { [key: string]: PlayerLevels }) => {
  const keys = Object.keys(levels);
  const key = keys[keys.length - 1];
  const totalExp =
    (levels[key].farming?.totalExp || 0) +
    (levels[key].mining?.totalExp || 0) +
    (levels[key].petcare?.totalExp || 0) +
    (levels[key].stoneshaping?.totalExp || 0) +
    (levels[key].woodwork?.totalExp || 0) +
    (levels[key].metalworking?.totalExp || 0) +
    (levels[key].business?.totalExp || 0) +
    (levels[key].cooking?.totalExp || 0) +
    (levels[key].forestry?.totalExp || 0) +
    (levels[key].exploration?.totalExp || 0);
  return totalExp;
};
