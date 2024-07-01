'use client';
import { SensorData } from '@/app/lib/sensorUtils';
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
import { useMemo, useState } from 'react';
import { Bar, Line } from 'react-chartjs-2';

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
  type: 'line' | 'bar';
}

function formatTimestamp(timestamp: Date): string {
  return `${timestamp.getFullYear()}-${
    timestamp.getMonth() + 1
  }-${timestamp.getDate()} ${timestamp.getHours()}:${timestamp.getMinutes()}`;
}

export function SensorValuesChart({ data }: SensorValuesChartProps) {
  const [chartType, setChartType] = useState<'line' | 'bar'>('line');
  return (
    <div className="p-2">
      <div className="flex flex-col gap-4 justify-center items-center">
        <h1>Equipment Data Chart</h1>
        <div className="flex w-80 justify-between ">
          <button
            className="flex w-30 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={() => setChartType('line')}
          >
            Line Chart
          </button>
          <button
            className="flex w-30 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={() => setChartType('bar')}
          >
            Bar Chart
          </button>
        </div>
      </div>
      <div>
        <Chart data={data} type={chartType} />
      </div>
    </div>
  );
}

function Chart({ data, type }: SensorValuesChartProps) {
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
      return {
        label: `Equipment ${equipmentId}`,
        data: equipmentData.map((entry) => ({
          x: formatTimestamp(entry.timestamp),
          y: entry.value,
        })),
        borderColor: `rgba(${75 + index * 20}, 192, 192, 1)`,
        backgroundColor: `rgba(${75 + index * 20}, 192, 192, 0.2)`,
        fill: false,
        tension: 0.1,
      };
    });
  }, [data]);

  const chartData = {
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

  return type === 'line' ? (
    <Line data={chartData} options={options} />
  ) : (
    <Bar data={chartData} options={options} />
  );
}
