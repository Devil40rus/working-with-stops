import { ICostInfo } from '../types';

export const getCostColor = (cost: number | null): string => {
  if (cost === null || cost === undefined) {
    return '#000000';
  }
  
  if (cost <= 5) {
    return '#22c55e';
  } else if (cost <= 15) {
    return '#eab308';
  } else if (cost <= 30) {
    return '#ef4444';
  } else {
    return '#7c3aed';
  }
}

export const formatCostInfo = (ICostInfo: ICostInfo | null): string => {
  if (!ICostInfo) {
    return 'Маршрут недоступен';
  }

  return `
    Агрегированные затраты: ${ICostInfo.cost.toFixed(1)} мин.
    Время ожидания: ${ICostInfo.iwait.toFixed(1)} мин.
    Время в салоне: ${ICostInfo.inveht.toFixed(1)} мин.
    Число пересадок: ${ICostInfo.xnum}
    Штраф за пересадки: ${ICostInfo.xpen.toFixed(1)} мин.
  `.trim();
}
