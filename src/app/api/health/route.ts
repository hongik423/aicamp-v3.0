import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const healthData = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      version: '3.1.0',
      environment: process.env.NODE_ENV || 'development',
      services: {
        database: 'connected',
        gemini: process.env.GEMINI_API_KEY ? 'configured' : 'not_configured',
        googleDrive: process.env.DRIVE_FOLDER_ID ? 'configured' : 'not_configured',
        email: process.env.SMTP_HOST ? 'configured' : 'not_configured'
      },
      uptime: process.uptime(),
      memory: process.memoryUsage(),
      system: {
        platform: process.platform,
        nodeVersion: process.version,
        arch: process.arch
      }
    };
    
    return NextResponse.json(healthData);
    
  } catch (error: any) {
    return NextResponse.json({
      status: 'unhealthy',
      error: error.message,
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  return NextResponse.json({
    message: 'Health check endpoint - use GET method',
    timestamp: new Date().toISOString()
  }, { status: 405 });
}