import { prisma } from '@/app/lib/prisma';
import { authMiddleware } from '@/app/middleware/auth';

import csv from 'csv-parser';
import multer from 'multer';
import { NextRequest, NextResponse } from 'next/server';
import { Readable } from 'stream';

const upload = multer({
  storage: multer.memoryStorage(), // Store file in memory
  limits: { fileSize: 10 * 1024 * 1024 }, // Limit file size to 10 MB
});

export const config = {
  api: {
    bodyParser: false, // Disable default body parser
  },
};

// Interface for CSV data format
interface SensorDataRecord {
  equipmentId: string;
  timestamp: string;
  value: string;
}

// Function to parse CSV
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

// Function to update the database
const updateDatabase = async (records: SensorDataRecord[]) => {
  for (const record of records) {
    await prisma.sensorData.upsert({
      where: {
        //Checks if an equipmentId_timestamp already exists with the processed csv
        equipmentId_timestamp: {
          equipmentId: record.equipmentId,
          timestamp: new Date(record.timestamp),
        },
      },
      update: {
        //Updates the database if it already exists
        value: parseFloat(record.value),
      },
      create: {
        //Create in database if it does not exist
        equipmentId: record.equipmentId,
        timestamp: new Date(record.timestamp),
        value: parseFloat(record.value),
      },
    });
  }
};

//Purpose of runMiddleware
/* The runMiddleware function is an adapter that allows you to integrate
traditional middleware (like multer for handling file uploads) with
Next.js. Next.js does not natively support middleware in the same way
that traditional frameworks like Express do, especially when it comes
to handling files. */

// Function to run multer middleware with Next.js
const runMiddleware = (req: any, res: any, fn: any) => {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
};

export const POST = async (req: NextRequest) => {
  const authResponse = await authMiddleware(req);
  if (authResponse.status !== 200) {
    return authResponse;
  }
  if (req.headers.get('content-type')?.startsWith('multipart/form-data')) {
    try {
      const res: any = {}; // Dummy response object
      await runMiddleware(req, res, upload.single('file')); // Process single file upload

      const arrayBuffer = await req.arrayBuffer(); // Get the buffer array

      const buffer = Buffer.from(arrayBuffer);

      if (!arrayBuffer.byteLength) {
        return NextResponse.json(
          { error: 'No file uploaded' },
          { status: 400 }
        );
      }

      const records = await parseCSV(buffer); // Parse CSV content

      await updateDatabase(records); // Update database with parsed records

      return NextResponse.json(
        { message: 'File processed and database updated successfully' },
        { status: 200 }
      );
    } catch (error) {
      return NextResponse.json(
        { error: 'Failed to process file' },
        { status: 500 }
      );
    }
  } else {
    return NextResponse.json(
      { error: 'Unsupported media type' },
      { status: 415 }
    );
  }
};
