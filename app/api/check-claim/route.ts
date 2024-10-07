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

  // Check if the user can claim points (1 hour cooldown)
  const canClaim = !user.lastClaimed || new Date().getTime() - new Date(user.lastClaimed).getTime() >= 3600000;

  return NextResponse.json({ canClaim });
}
