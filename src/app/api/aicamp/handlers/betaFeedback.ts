import { NextResponse } from 'next/server';
import { saveToGoogleSheets } from '../services/googleSheets';
import { sendEmail } from '../services/emailService';

// 베타 피드백 처리
export async function processBetaFeedback(data: any) {
  try {
    const timestamp = new Date().toISOString();
    const rowNumber = Date.now(); // 임시 행 번호

    // 필수 필드 검증
    if (!data.email || !data.name || !data.rating || !data.feedback) {
      return NextResponse.json(
        { success: false, error: '필수 정보가 누락되었습니다.' },
        { status: 400 }
      );
    }

    // 베타 피드백 데이터 구성
    const feedbackData = {
      timestamp,
      name: data.name || '',
      email: data.email || '',
      phone: data.phone || '',
      rating: data.rating || '',
      feedback: data.feedback || '',
      improvements: data.improvements || '',
      additionalFeatures: data.additionalFeatures || '',
      wouldRecommend: data.wouldRecommend || '',
      testimonial: data.testimonial || '',
      contactForInterview: data.contactForInterview ? 'Y' : 'N',
      status: '신규'
    };

    // Google Sheets에 저장
    await saveToGoogleSheets('베타피드백', feedbackData);

    // 사용자 확인 이메일 발송
    await sendEmail({
      to: data.email,
      subject: '[AICAMP] 소중한 피드백 감사드립니다!',
      type: 'betaFeedbackConfirmation',
      data: {
        name: data.name,
        rating: data.rating,
        feedback: data.feedback
      }
    });

    // 관리자 알림 이메일 발송
    await sendEmail({
      to: process.env.ADMIN_EMAIL || 'hongik423@gmail.com',
      subject: `[베타 피드백] ${data.name} - 평점 ${data.rating}/5`,
      type: 'betaFeedbackAdminNotification',
      data: {
        ...feedbackData,
        rowNumber
      }
    });

    console.log('✅ 베타 피드백 처리 완료:', data.name);

    return NextResponse.json({
      success: true,
      data: {
        message: '피드백이 성공적으로 접수되었습니다. 감사합니다!',
        feedbackId: `BF-${Date.now()}`
      }
    });

  } catch (error) {
    console.error('❌ 베타 피드백 처리 오류:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: '피드백 처리 중 오류가 발생했습니다.' 
      },
      { status: 500 }
    );
  }
}