'use client';
import { SensorData, calculateAverages } from '@/app/lib/sensorUtils';
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
    const equipmentData = averages[equipmentId];
    return {
      label: `Equipment ${equipmentId}`,
      data: periods.map((period) => equipmentData[period] || 0),
      backgroundColor: `rgba(${75 + index * 20}, 192, 192, 0.6)`,
      borderColor: `rgba(${75 + index * 20}, 192, 192, 1)`,
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

  return <Bar data={chartData} options={options} />;
}
