import { getSensorData } from '../lib/dal';
import Layout from './_components/layout';
import { SensorValuesChart } from './_components/sensor-values-chart';

export default async function Home() {
  const sensorData = await getSensorData();
  return (
    <Layout>
      <SensorValuesChart data={sensorData} type="line" />
    </Layout>
  );
}
