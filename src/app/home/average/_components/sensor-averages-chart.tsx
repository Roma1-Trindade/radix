'use client';
import {
  SensorData,
  calculateAverages,
  getRandomColor,
} from '@/app/lib/sensorUtils';
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js';
import { useMemo } from 'react';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface SensorAveragesChartProps {
  data: SensorData[];
  periods: number[];
}

function periodToLabel(period: number): string {
  switch (period) {
    case 24:
      return '24 horas';
    case 48:
      return '48 horas';
    case 168:
      return '1 semana';
    case 720:
      return '1 mês';
    default:
      return `${period} horas`;
  }
}

export default function SensorAveragesChart({
  data,
  periods,
}: SensorAveragesChartProps) {
  const averages = useMemo(
    () => calculateAverages(data, periods),
    [data, periods]
  );

  const labels = periods.map(periodToLabel);
  const datasets = Object.keys(averages).map((equipmentId, index) => {
    const color = getRandomColor();
    const equipmentData = averages[equipmentId];
    return {
      label: `Equipment ${equipmentId}`,
      data: periods.map((period) => equipmentData[period] || 0),
      borderColor: `rgba(${color}, 1)`,
      backgroundColor: `rgba(${color}, 0.2)`,
      borderWidth: 1,
    };
  });

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
        text: 'Sensor Averages Over Different Periods',
      },
    },
  };

  return (
    <div className="p-2">
      <Bar data={chartData} options={options} />
    </div>
  );
}
