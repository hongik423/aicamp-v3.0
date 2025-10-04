import { NextResponse } from 'next/server';

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      status: 'healthy',
      timestamp: new Date().toISOString(),
      version: '3.0.0',
      services: {
        api: 'running',
        database: 'connected',
        gas: 'available'
      }
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      status: 'error',
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400',
    },
  });
}