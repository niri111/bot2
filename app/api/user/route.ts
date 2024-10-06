

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
    try {
        const userData = await req.json();

        if (!userData || !userData.id) {
            return NextResponse.json({ error: 'Invalid user data' }, { status: 400 });
        }

        // Check if the user already exists
        let user = await prisma.user.findUnique({
            where: { telegramId: userData.id }
        });

        if (!user) {
            // Only create the user if it doesn't exist
            user = await prisma.user.create({
                data: {
                    telegramId: userData.id, // Should not be a duplicate
                    username: userData.username || '',
                    firstName: userData.first_name || '',
                    lastName: userData.last_name || ''
                }
            });
        } else {
            console.log(`User already exists: ${user.telegramId}`);
        }

        return NextResponse.json(user);
    } catch (error) {
        console.error('Error processing user data:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
