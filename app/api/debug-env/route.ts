import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    hasMongoUri: !!process.env.MONGODB_URI,
    mongoDbName: process.env.MONGODB_DB || 'not set',
    uriLength: process.env.MONGODB_URI?.length || 0,
    uriPreview: process.env.MONGODB_URI ? process.env.MONGODB_URI.substring(0, 30) + '...' : 'NOT SET',
    nodeEnv: process.env.NODE_ENV
  });
}

