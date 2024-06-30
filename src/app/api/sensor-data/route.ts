import { prisma } from '@/app/lib/prisma';
import { authMiddleware } from '@/app/middleware/auth';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { equipmentId, timestamp, value } = await req.json();
  const authResponse = await authMiddleware(req);
  if (authResponse.status !== 200) {
    return authResponse;
  }
  try {
    const sensorData = await prisma.sensorData.create({
      data: {
        equipmentId,
        timestamp: new Date(timestamp),
        value,
      },
    });
    return NextResponse.json(sensorData, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to store sensor data' },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  const authResponse = await authMiddleware(req);
  if (authResponse.status !== 200) {
    return authResponse;
  }
  try {
    const sensorData = await prisma.sensorData.findMany();
    return NextResponse.json(sensorData, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch sensor data' },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const { equipmentId, timestamp, value } = await req.json();
  try {
    const sensorData = await prisma.sensorData.update({
      where: { id: Number(id) },
      data: {
        equipmentId,
        timestamp: new Date(timestamp),
        value,
      },
    });
    return NextResponse.json(sensorData, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update sensor data' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  try {
    await prisma.sensorData.delete({
      where: { id: Number(id) },
    });
    return NextResponse.json(
      { message: 'Sensor data deleted' },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete sensor data' },
      { status: 500 }
    );
  }
}
