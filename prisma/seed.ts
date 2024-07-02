import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

import csvParser from 'csv-parser';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

interface SensorData {
  equipmentId: string;
  timestamp: Date;
  value: number;
}

const prisma = new PrismaClient();

async function main() {
  const sensorData: SensorData[] = [];
  const hashedPassword = await bcrypt.hash('admin@prisma.io', 10);
  await prisma.user.upsert({
    where: { email: 'admin@prisma.io' },
    update: {},
    create: {
      email: 'admin@prisma.io',
      password: hashedPassword,
    },
  });

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const csvFilePath = path.join(__dirname, 'data', 'sensor-data.csv');
  // Read CSV file and parse data
  fs.createReadStream(csvFilePath)
    .pipe(csvParser())
    .on('data', (row) => {
      sensorData.push({
        equipmentId: row.equipmentId,
        timestamp: new Date(row.timestamp),
        value: parseFloat(row.value),
      });
    })
    .on('end', async () => {
      console.log('CSV file successfully processed');

      // Insert data into the database
      for (const data of sensorData) {
        await prisma.sensorData.create({
          data: {
            equipmentId: data.equipmentId,
            timestamp: data.timestamp,
            value: data.value,
          },
        });
      }

      console.log('Data successfully inserted into the database');

      // Disconnect Prisma Client
      await prisma.$disconnect();
    });
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
