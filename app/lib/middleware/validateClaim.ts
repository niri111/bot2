// /lib/middleware/validateClaim.ts
import { NextResponse } from 'next/server';

export function validateClaim(request: Request) {
  return async (next: () => Promise<Response>) => {
    const { telegramId } = await request.json();
    
    if (!telegramId) {
      return NextResponse.json({ error: 'Telegram ID is required' }, { status: 400 });
    }

    return next();
  };
}
