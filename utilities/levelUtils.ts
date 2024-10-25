import { LevelData } from '../types';

export const getLevelFromObject = (obj: LevelData) => {
  return [obj.level, obj.totalExp];
};

export const convertData = (obj: Record<string, { level: number; totalExp: number }>) => {
  const newObj = {};
  Object.keys(obj).forEach((key) => {
    newObj[key] = getLevelFromObject(obj[key]);
  });
  return newObj;
};

export const getTotalLevel = (levels: Record<string, { level: number; totalExp: number }>) => {
  const keys = Object.keys(levels);
  let totalLevel = 0;
  keys.forEach((key) => {
    if (key === 'overall' || key == 'total') return;
    totalLevel += levels[key]?.level || 0;
  });
  return totalLevel;
};

export const getTotalExp = (levels: Record<string, { level: number; totalExp: number }>) => {
  const keys = Object.keys(levels);
  let totalExp = 0;
  keys.forEach((key) => {
    if (key === 'overall' || key == 'total') return;
    totalExp += levels[key]?.totalExp || 0;
  });
  return totalExp;
};
