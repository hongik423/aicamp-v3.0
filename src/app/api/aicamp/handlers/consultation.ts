import { NextResponse } from 'next/server';
import { saveToGoogleSheets } from '../services/googleSheets';
import { sendEmail } from '../services/emailService';

// 상담 신청 처리
export async function processConsultationForm(data: any) {
  try {
    const timestamp = new Date().toISOString();
    const rowNumber = Date.now(); // 임시 행 번호

    // 필수 필드 검증
    if (!data.companyName || !data.contactManager || !data.email || !data.phone) {
      return NextResponse.json(
        { success: false, error: '필수 정보가 누락되었습니다.' },
        { status: 400 }
      );
    }

    // 상담 신청 데이터 구성
    const consultationData = {
      timestamp,
      companyName: data.companyName || '',
      contactManager: data.contactManager || '',
      email: data.email || '',
      phone: data.phone || '',
      consultingArea: data.consultingArea || '',
      currentIssues: data.currentIssues || '',
      desiredDate: data.desiredDate || '',
      desiredTime: data.desiredTime || '',
      desiredFormat: data.desiredFormat || '방문상담',
      employeeCount: data.employeeCount || '',
      annualRevenue: data.annualRevenue || '',
      businessHistory: data.businessHistory || '',
      mainProducts: data.mainProducts || '',
      competitors: data.competitors || '',
      budget: data.budget || '',
      consultingExperience: data.consultingExperience || '',
      expectedDuration: data.expectedDuration || '',
      decisionMaker: data.decisionMaker || '',
      urgency: data.urgency || '보통',
      specificRequests: data.specificRequests || '',
      howDidYouHear: data.howDidYouHear || '',
      privacyConsent: data.privacyConsent ? 'Y' : 'N',
      marketingConsent: data.marketingConsent ? 'Y' : 'N',
      status: '신규'
    };

    // Google Sheets에 저장
    await saveToGoogleSheets('상담신청', consultationData);

    // 사용자 확인 이메일 발송
    await sendEmail({
      to: data.email,
      subject: `[AICAMP] ${data.companyName}님의 상담 신청이 접수되었습니다`,
      type: 'consultationConfirmation',
      data: {
        companyName: data.companyName,
        contactManager: data.contactManager,
        consultingArea: data.consultingArea,
        desiredDate: data.desiredDate,
        desiredTime: data.desiredTime,
        desiredFormat: data.desiredFormat
      }
    });

    // 관리자 알림 이메일 발송
    await sendEmail({
      to: process.env.ADMIN_EMAIL || 'hongik423@gmail.com',
      subject: `[상담 신청] ${data.companyName} - ${data.consultingArea}`,
      type: 'consultationAdminNotification',
      data: {
        ...consultationData,
        rowNumber
      }
    });

    console.log('✅ 상담 신청 처리 완료:', data.companyName);

    return NextResponse.json({
      success: true,
      data: {
        message: '상담 신청이 성공적으로 접수되었습니다.',
        consultationId: `CS-${Date.now()}`,
        expectedResponse: '영업일 기준 1-2일 이내'
      }
    });

  } catch (error) {
    console.error('❌ 상담 신청 처리 오류:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: '상담 신청 처리 중 오류가 발생했습니다.' 
      },
      { status: 500 }
    );
  }
}