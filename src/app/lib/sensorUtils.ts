export interface SensorData {
  id: number;
  equipmentId: string;
  timestamp: Date;
  value: number;
}

export function filterDataByTime(
  data: SensorData[],
  hours: number
): SensorData[] {
  const now = new Date();
  return data.filter((item) => {
    const timestamp = new Date(item.timestamp);
    return (now.getTime() - timestamp.getTime()) / (1000 * 60 * 60) <= hours;
  });
}

interface Averages {
  [equipmentId: string]: {
    [period: number]: number;
  };
}

export function calculateAverages(
  data: SensorData[],
  periods: number[]
): Averages {
  const groupedByEquipmentId = data.reduce((acc, entry) => {
    if (!acc[entry.equipmentId]) {
      acc[entry.equipmentId] = [];
    }
    acc[entry.equipmentId].push(entry);
    return acc;
  }, {} as Record<string, SensorData[]>);

  const averages: Averages = {};

  for (const equipmentId in groupedByEquipmentId) {
    averages[equipmentId] = {};
    const equipmentData = groupedByEquipmentId[equipmentId];

    for (const period of periods) {
      const periodEndTime = Date.now();
      const periodStartTime = periodEndTime - period * 3600000; // Convert hours to milliseconds

      const valuesInPeriod = equipmentData
        .filter((entry) => {
          const entryTimestamp = new Date(entry.timestamp).getTime();
          return (
            entryTimestamp >= periodStartTime && entryTimestamp <= periodEndTime
          );
        })
        .map((entry) => entry.value);

      const averageValue = valuesInPeriod.length
        ? valuesInPeriod.reduce((sum, value) => sum + value, 0) /
          valuesInPeriod.length
        : 0;

      averages[equipmentId][period] = averageValue;
    }
  }

  return averages;
}

export function getRandomColor() {
  var r = Math.floor(Math.random() * 255);
  var g = Math.floor(Math.random() * 255);
  var b = Math.floor(Math.random() * 255);
  return r + ',' + g + ',' + b;
}
