import { NextResponse } from 'next/server';
import { classifyEmail } from '@/lib/classifier';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const emails: string[] = body.emails || [];
    
    if (!Array.isArray(emails) || emails.length === 0) {
      return NextResponse.json({ error: 'An array of email strings is required.' }, { status: 400 });
    }

    if (emails.length > 5000) {
      return NextResponse.json({ error: `Batch too large. Maximum is 5,000 emails per request. You sent ${emails.length}.` }, { status: 400 });
    }
    
    const results = emails.map(email => {
      if (typeof email !== 'string') {
        return {
          email: String(email),
          prediction: 'Unknown',
          confidence: 0,
          error: 'Input must be a string'
        };
      }

      const res = classifyEmail(email);
      return {
        email,
        prediction: res.prediction,
        confidence: res.confidence
      };
    });
    
    const spamCount = results.filter(r => r.prediction === 'Spam').length;
    const hamCount = results.length - spamCount;
    
    return NextResponse.json({
      total: results.length,
      spamCount,
      hamCount,
      results
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Batch classification failed' }, { status: 500 });
  }
}
