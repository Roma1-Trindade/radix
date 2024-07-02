'use client';
import { SensorData, getRandomColor } from '@/app/lib/sensorUtils';
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import { useMemo } from 'react';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

interface SensorValuesChartProps {
  data: SensorData[];
}

function formatTimestamp(timestamp: Date): string {
  return `${timestamp.getFullYear()}-${
    timestamp.getMonth() + 1
  }-${timestamp.getDate()} ${timestamp.getHours()}:${timestamp.getMinutes()}`;
}

export function SensorValuesChart({ data }: SensorValuesChartProps) {
  const datasets = useMemo(() => {
    const groupedByEquipmentId = data.reduce((acc, entry) => {
      if (!acc[entry.equipmentId]) {
        acc[entry.equipmentId] = [];
      }
      acc[entry.equipmentId].push(entry);
      return acc;
    }, {} as Record<string, SensorData[]>);

    return Object.keys(groupedByEquipmentId).map((equipmentId, index) => {
      const equipmentData = groupedByEquipmentId[equipmentId].sort(
        (a, b) =>
          new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
      );
      const color = getRandomColor();
      return {
        label: `Equipment ${equipmentId}`,
        data: equipmentData.map((entry) => ({
          x: formatTimestamp(entry.timestamp),
          y: entry.value,
        })),
        borderColor: `rgba(${color}, 1)`,
        backgroundColor: `rgba(${color}, 0.2)`,
        fill: false,
        tension: 0.1,
      };
    });
  }, [data]);

  const labels = Array.from(
    new Set(data.map((entry) => formatTimestamp(new Date(entry.timestamp))))
  ).sort((a, b) => new Date(a).getTime() - new Date(b).getTime());

  const chartData = {
    labels,
    datasets,
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Sensor Values Over Time',
      },
    },
  };

  return (
    <div className="p-2">
      <Line data={chartData} options={options} />
    </div>
  );
}
