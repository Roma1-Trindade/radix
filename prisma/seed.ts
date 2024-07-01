import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import csv from 'csv-parser';
import path from 'path';
import { Readable } from 'stream';

interface SensorDataRecord {
  equipmentId: string;
  timestamp: string;
  value: string;
}

interface SensorData {
  equipmentId: string;
  timestamp: string;
  value: number;
}

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('admin@prisma.io', 10);
  await prisma.user.upsert({
    where: { email: 'admin@prisma.io' },
    update: {},
    create: {
      email: 'admin@prisma.io',
      password: hashedPassword,
    },
  });

  const filePath = path.resolve('../prisma', 'sensorData.csv');
  console.log('filePath: ', filePath);

  const buffer = Buffer.from(filePath);

  const parseCSV = (fileBuffer: Buffer): Promise<SensorDataRecord[]> => {
    return new Promise((resolve, reject) => {
      const results: SensorDataRecord[] = [];
      const stream = Readable.from(fileBuffer.toString());

      stream
        .pipe(csv())
        .on('data', (data) => results.push(data as SensorDataRecord))
        .on('end', () => resolve(results))
        .on('error', (error) => reject(error));
    });
  };
  const response: SensorDataRecord[] = await parseCSV(buffer);
  const sensorDataParsed: SensorData[] = response.map((record) => ({
    equipmentId: record.equipmentId,
    timestamp: record.timestamp,
    value: parseFloat(record.value),
  }));
  await prisma.sensorData.createMany({ data: sensorDataParsed });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
