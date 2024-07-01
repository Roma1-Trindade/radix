import { getSensorData } from '@/app/lib/dal';
import Layout from '../_components/layout';
import SensorAveragesChart from './_components/sensor-averages-chart';

export default async function Average() {
  const periods = [24, 48, 168, 720]; // 24 hours, 48 hours, 1 week, 1 month in hours

  const sensorDataRes = await getSensorData();

  return (
    <Layout>
      <SensorAveragesChart data={sensorDataRes} periods={periods} />
    </Layout>
  );
}
