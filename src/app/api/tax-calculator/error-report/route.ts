import { NextRequest, NextResponse } from 'next/server';

interface ErrorReportData {
  name: string;
  email: string;
  phone?: string;
  calculatorType: string;
  errorDescription: string;
  expectedBehavior?: string;
  actualBehavior?: string;
  stepsToReproduce?: string;
  browserInfo?: string;
  deviceInfo?: string;
  additionalInfo?: string;
  timestamp: string;
}

export async function POST(request: NextRequest) {
  try {
    const data: ErrorReportData = await request.json();

    // 필수 필드 검증
    if (!data.name || !data.email || !data.calculatorType || !data.errorDescription) {
      return NextResponse.json(
        { success: false, error: '필수 정보가 누락되었습니다.' },
        { status: 400 }
      );
    }

    // 이메일 형식 검증
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return NextResponse.json(
        { success: false, error: '유효한 이메일 주소를 입력해주세요.' },
        { status: 400 }
      );
    }

    console.log('📝 세금계산기 오류 신고 접수:', {
      이름: data.name,
      이메일: data.email,
      계산기: data.calculatorType,
      오류설명: data.errorDescription.substring(0, 50) + '...'
    });

    // Google Apps Script로 데이터 전송
    const googleAppsScriptUrl = 'https://script.google.com/macros/s/AKfycbzO4ykDtUetroPX2TtQ1wkiOVNtd56tUZpPT4EITaLnXeMxTGdIIN8MIEMvOOy8ywTN/exec';
    
    const reportData = {
      action: 'feedback',
      name: data.name,
      email: data.email,
      phone: data.phone || '',
      calculatorType: data.calculatorType,
      errorDescription: data.errorDescription,
      expectedBehavior: data.expectedBehavior || '',
      actualBehavior: data.actualBehavior || '',
      stepsToReproduce: data.stepsToReproduce || '',
      browserInfo: data.browserInfo || '',
      deviceInfo: data.deviceInfo || '',
      additionalInfo: data.additionalInfo || '',
      reportType: 'tax_calculator_error',
      status: '신규'
    };

    const response = await fetch(googleAppsScriptUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reportData),
    });

    if (!response.ok) {
      console.error('❌ Google Apps Script 오류:', response.status, response.statusText);
      throw new Error('Google Apps Script 처리 실패');
    }

    const result = await response.text();
    console.log('✅ Google Apps Script 응답:', result);

    // 성공 응답
    return NextResponse.json({
      success: true,
      message: '오류 신고가 성공적으로 접수되었습니다.',
      reportId: `TAX_ERROR_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    });

  } catch (error) {
    console.error('❌ 세금계산기 오류 신고 처리 오류:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: '오류 신고 처리 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요.' 
      },
      { status: 500 }
    );
  }
} 