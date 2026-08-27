import { NextResponse } from 'next/server';
import { classifyEmail } from '@/lib/classifier';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = body.email || body.text || '';
    
    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Email content is required.' }, { status: 400 });
    }

    if (email.length > 50000) {
      return NextResponse.json({ error: 'Email is too long. Maximum allowed is 50,000 characters.' }, { status: 400 });
    }
    
    const result = classifyEmail(email);
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Classification failed' }, { status: 500 });
  }
}
