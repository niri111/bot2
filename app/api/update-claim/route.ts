import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  const { telegramId } = await req.json();

  const user = await prisma.user.findUnique({
    where: { telegramId },
  });

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  // Update points and lastClaimed timestamp
  const updatedUser = await prisma.user.update({
    where: { telegramId },
    data: {
      points: user.points + 1000, // Add 1000 points
      lastClaimed: new Date(), // Update last claimed timestamp
    },
  });

  return NextResponse.json({ success: true, points: updatedUser.points });
}
