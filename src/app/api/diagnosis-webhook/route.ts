import { NextRequest, NextResponse } from 'next/server';
import { addProgressEvent, getProgressSnapshot } from '../_progressStore';

export const runtime = 'nodejs';

export async function OPTIONS() {
  return NextResponse.json({}, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const diagnosisId = searchParams.get('diagnosisId');
  if (!diagnosisId) {
    return NextResponse.json({ success: false, error: 'diagnosisId가 필요합니다' }, { status: 400 });
  }
  const snapshot = getProgressSnapshot(diagnosisId);
  return NextResponse.json({ success: true, diagnosisId, snapshot });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { diagnosisId, stepId, stepName, status, progressPercent, message, meta } = body || {};

    if (!diagnosisId) {
      return NextResponse.json({ success: false, error: 'diagnosisId는 필수입니다' }, { status: 400 });
    }

    addProgressEvent({ diagnosisId, stepId, stepName, status, progressPercent, message, meta });

    return NextResponse.json({ success: true });
  } catch (e: any) {
    return NextResponse.json({ success: false, error: e?.message || 'invalid payload' }, { status: 400 });
  }
}


