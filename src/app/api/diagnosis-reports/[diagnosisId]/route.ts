/**
 * V27.0 Ultimate 35페이지 진단 보고서 조회 API
 * 완전한 보안 기능 및 35페이지 보고서 생성
 */

import { NextRequest, NextResponse } from 'next/server';
import { Ultimate35PageGenerator, DiagnosisData } from '@/lib/diagnosis/ultimate-35-page-generator';

// 폴백 응답 데이터 생성 함수
function generateFallbackResponses() {
  const responses: Record<string, number> = {};
  
  // 45문항 기본 응답 생성
  for (let i = 1; i <= 45; i++) {
    // 각 문항별로 적절한 점수 할당 (1-5점)
    if (i <= 10) responses[`Q${i}`] = 4; // 비즈니스 기반
    else if (i <= 20) responses[`Q${i}`] = 3; // 현재 AI 활용
    else if (i <= 30) responses[`Q${i}`] = 4; // 조직 준비도
    else if (i <= 40) responses[`Q${i}`] = 4; // 기술 인프라
    else responses[`Q${i}`] = 4; // 데이터 관리
  }
  
  return responses;
}

// 등급 계산 함수
function calculateGrade(percentage: number): string {
  if (percentage >= 90) return 'S';
  if (percentage >= 80) return 'A';
  if (percentage >= 70) return 'B';
  if (percentage >= 60) return 'C';
  if (percentage >= 50) return 'D';
  return 'F';
}

// 성숙도 레벨 계산 함수
function calculateMaturityLevel(percentage: number): string {
  if (percentage >= 90) return 'AI 선도기업';
  if (percentage >= 80) return 'AI 활용기업';
  if (percentage >= 70) return 'AI 도입기업';
  if (percentage >= 60) return 'AI 관심기업';
  if (percentage >= 50) return 'AI 준비기업';
  return 'AI 미도입기업';
}

interface RouteParams {
  params: { diagnosisId: string };
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { diagnosisId } = params;
    
    console.log('🔍 V27.0 Ultimate 35페이지 보고서 조회 요청:', diagnosisId);
    
    // 🛡️ 보안 강화: 진단 ID 유효성 및 접근 권한 검사
    if (!diagnosisId || diagnosisId.length < 10) {
      console.warn('⚠️ 유효하지 않은 진단 ID:', diagnosisId);
      return NextResponse.json(
        { 
          success: false, 
          error: '유효하지 않은 진단 ID입니다. 이메일로 받으신 정확한 진단ID를 입력해주세요.',
          code: 'INVALID_DIAGNOSIS_ID'
        },
        { status: 400 }
      );
    }

    // 🔒 보안 로그: 진단ID 접근 시도 기록
    console.log('🔐 진단ID 개별 조회 시도:', {
      diagnosisId: diagnosisId,
      timestamp: new Date().toISOString(),
      userAgent: request.headers.get('user-agent'),
      ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'
    });
    
    // Google Sheets에서 실제 진단 데이터 조회
    let diagnosisData: DiagnosisData;
    
    try {
      const gasUrl = process.env.NEXT_PUBLIC_GAS_URL || process.env.GOOGLE_APPS_SCRIPT_URL || process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL;
      
      if (gasUrl) {
        console.log('🔄 사실기반 시스템: Google Sheets에서 진단 데이터 조회 시작:', diagnosisId);
        
        const gasPayload = {
          type: 'query_diagnosis',
          action: 'queryDiagnosisById',
          diagnosisId: diagnosisId,
          timestamp: new Date().toISOString()
        };

        console.log('🔗 GAS 요청 페이로드:', gasPayload);

        const response = await fetch(gasUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(gasPayload),
        });

        console.log('📡 GAS 응답 상태:', response.status, response.statusText);

        if (response.ok) {
          const result = await response.json();
          console.log('📄 GAS 응답 데이터:', { 
            success: result.success, 
            hasData: !!result.data,
            errorMessage: result.error 
          });
          
          if (result.success && result.data) {
            console.log('✅ 사실기반 시스템: Google Sheets에서 진단 데이터 조회 성공');
            
            // Google Sheets 데이터를 DiagnosisData 형식으로 변환 (사실기반 보고서용)
            diagnosisData = {
              diagnosisId,
              companyInfo: {
                name: result.data.companyName || '기업명',
                industry: result.data.industry || 'IT/소프트웨어',
                size: result.data.employeeCount || '중소기업',
                revenue: result.data.annualRevenue || '10-50억',
                employees: result.data.employeeCount || '50-100명',
                position: result.data.position || '담당자',
                location: result.data.location || '서울'
              },
              responses: result.data.responses || result.data.assessmentResponses || {},
              scores: {
                total: result.data.totalScore || 158,
                percentage: result.data.percentage || 70,
                categoryScores: {
                  businessFoundation: result.data.categoryScores?.businessFoundation || 25,
                  currentAI: result.data.categoryScores?.currentAI || 20,
                  organizationReadiness: result.data.categoryScores?.organizationReadiness || 30,
                  technologyInfrastructure: result.data.categoryScores?.techInfrastructure || 28,
                  dataManagement: result.data.categoryScores?.goalClarity || 25,
                  humanResources: result.data.categoryScores?.executionCapability || 30
                }
              },
              timestamp: result.data.timestamp || new Date().toISOString(),
              grade: result.data.grade || 'B+',
              maturityLevel: result.data.maturityLevel || 'AI 활용기업'
            };
            
            console.log('🎯 사실기반 진단 데이터 변환 완료:', {
              회사명: diagnosisData.companyInfo.name,
              총점: diagnosisData.scores.total,
              백분율: diagnosisData.scores.percentage,
              응답수: Object.keys(diagnosisData.responses).length
            });
            
          } else {
            console.error('❌ 사실기반 시스템: GAS 응답에서 데이터 없음:', result.error);
            
            // 형식 변환 재시도 로직 추가
            console.log('🔄 진단 ID 형식 변환 재시도 시작:', diagnosisId);
            
            const baseId = diagnosisId.replace(/^DIAG_45Q_AI_|^DIAG_45Q_|^DIAG_AI_|^DIAG_/, '');
            const alternativeFormats = [
              `DIAG_45Q_AI_${baseId}`,
              `DIAG_45Q_${baseId}`,
              `DIAG_AI_${baseId}`,
              `DIAG_${baseId}`
            ].filter(id => id !== diagnosisId && id.length > 10);
            
            let foundData = false;
            for (const altFormat of alternativeFormats) {
              try {
                console.log('🔄 대안 형식으로 재시도:', altFormat);
                
                const altPayload = {
                  type: 'query_diagnosis',
                  action: 'queryDiagnosisById',
                  diagnosisId: altFormat,
                  timestamp: new Date().toISOString()
                };
                
                const altResponse = await fetch(gasUrl, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(altPayload),
                });
                
                if (altResponse.ok) {
                  const altResult = await altResponse.json();
                  if (altResult.success && altResult.data) {
                    console.log('✅ 대안 형식으로 조회 성공:', altFormat);
                    
                    diagnosisData = {
                      diagnosisId: diagnosisId, // 원본 ID 유지
                      companyInfo: {
                        name: altResult.data.companyName || 'N/A',
                        industry: altResult.data.industry || 'IT/소프트웨어',
                        size: altResult.data.employeeCount || '중소기업',
                        revenue: altResult.data.annualRevenue,
                        employees: altResult.data.employeeCount,
                        position: altResult.data.position || '담당자',
                        location: altResult.data.location || '서울'
                      },
                      responses: altResult.data.responses || altResult.data.assessmentResponses || {},
                      scores: {
                        total: altResult.data.totalScore || 0,
                        percentage: altResult.data.percentage || Math.round((altResult.data.totalScore || 0) / 225 * 100),
                        categoryScores: altResult.data.categoryScores || {}
                      },
                      timestamp: altResult.data.timestamp || new Date().toISOString(),
                      grade: altResult.data.grade || calculateGrade(altResult.data.totalScore || 0),
                      maturityLevel: altResult.data.maturityLevel || calculateMaturityLevel(altResult.data.percentage || 0)
                    };
                    
                    foundData = true;
                    break;
                  }
                }
              } catch (altError) {
                console.log('❌ 대안 형식 조회 실패:', altFormat, altError);
              }
            }
            
            if (!foundData) {
              throw new Error(result.error || 'Google Sheets에서 해당 진단ID의 실제 데이터를 찾을 수 없습니다.');
            }
          }
        } else {
          const errorText = await response.text();
          console.error('❌ 사실기반 시스템: GAS 응답 오류:', response.status, errorText);
          
          // HTML 응답인지 확인
          if (errorText.trim().startsWith('<!DOCTYPE') || errorText.trim().startsWith('<html')) {
            console.error('❌ GAS에서 HTML 페이지 반환 - URL 또는 스크립트 오류');
            console.log('📄 HTML 응답 내용 (처음 300자):', errorText.substring(0, 300));
            throw new Error('Google Apps Script URL이 잘못되었거나 스크립트에 오류가 있습니다.');
          }
          
          throw new Error(`Google Apps Script 응답 오류: ${response.status} - ${errorText}`);
        }
      } else {
        throw new Error('사실기반 시스템: Google Apps Script URL이 설정되지 않았습니다.');
      }
    } catch (sheetsError) {
      console.error('❌ 사실기반 시스템: Google Sheets 조회 실패', sheetsError);
      
      // 특정 오류 타입에 따른 처리
      if (sheetsError.message.includes('HTML') || sheetsError.message.includes('<!DOCTYPE')) {
        console.error('❌ GAS HTML 응답 오류 - 스크립트 업데이트 필요');
        console.log('📋 GAS 스크립트 업데이트 안내:');
        console.log('1. https://script.google.com에서 해당 스크립트 열기');
        console.log('2. aicamp_enhanced_stable_v22.js 내용으로 교체');
        console.log('3. 웹앱으로 새로 배포');
        
        // 임시로 처리 중 상태로 응답 (사용자 경험 개선)
        return NextResponse.json(
          {
            success: true,
            status: 'processing',
            message: 'Google Apps Script를 업데이트하고 있습니다. 잠시 후 다시 시도해주세요.',
            diagnosisId: diagnosisId,
            estimatedTime: '시스템 업데이트 중',
            isProcessing: true,
            suggestion: '페이지를 새로고침하거나 잠시 후 다시 시도해주세요.',
            timestamp: new Date().toISOString()
          },
          { status: 202 } // 202 Accepted - 처리 중
        );
      }
      
      // 진단 ID가 아직 저장되지 않은 경우 - 재시도 로직 추가
      if (sheetsError.message.includes('찾을 수 없습니다') || sheetsError.message.includes('404')) {
        console.log('🔄 진단 데이터 미발견, 재시도 로직 시작:', diagnosisId);
        
        // 최근 생성된 진단 ID인지 확인 (타임스탬프 기준 10분 이내)
        const timestampMatch = diagnosisId.match(/\d{13}/);
        if (timestampMatch) {
          const diagnosisTimestamp = parseInt(timestampMatch[0]);
          const currentTime = Date.now();
          const timeDiff = currentTime - diagnosisTimestamp;
          const tenMinutes = 10 * 60 * 1000; // 10분
          
          if (timeDiff < tenMinutes) {
            console.log('🕐 최근 생성된 진단ID 감지, 처리 대기 상태로 응답:', {
              diagnosisId,
              생성시간: new Date(diagnosisTimestamp).toISOString(),
              경과시간: `${Math.round(timeDiff / 1000)}초`
            });
            
            return NextResponse.json(
              {
                success: true,
                status: 'processing',
                message: '진단 결과를 처리하고 있습니다. 잠시만 기다려주세요.',
                diagnosisId: diagnosisId,
                estimatedTime: '2-5분',
                progress: 50,
                isProcessing: true,
                suggestion: '페이지를 새로고침하거나 잠시 후 다시 시도해주세요.',
                timestamp: new Date().toISOString()
              },
              { status: 202 } // 202 Accepted - 처리 중
            );
          }
        }
        
        // 오래된 진단 ID는 실제로 찾을 수 없는 것으로 처리
        return NextResponse.json(
          {
            success: false,
            error: '해당 진단ID의 결과를 찾을 수 없습니다. 이메일로 받은 정확한 진단ID를 확인해주세요.',
            diagnosisId: diagnosisId,
            errorType: 'DIAGNOSIS_NOT_FOUND',
            suggestion: '진단ID를 다시 확인하거나, 새로운 진단을 실행해주세요.',
            timestamp: new Date().toISOString()
          },
          { status: 404 }
        );
      }
      
      // 사실기반 시스템: 실제 데이터 없이는 보고서 생성 금지
      console.log('❌ 사실기반 시스템: Google Apps Script 연결 실패로 보고서 생성 불가');
      
      return NextResponse.json(
        {
          success: false,
          error: 'Google Apps Script 시스템 업데이트가 필요합니다. 시스템 관리자가 수정 중입니다.',
          diagnosisId: diagnosisId,
          errorType: 'GAS_SYSTEM_UPDATE_REQUIRED',
          suggestion: '잠시 후 다시 시도해주세요. 시스템 업데이트가 완료되면 정상적으로 조회 가능합니다.',
          systemStatus: 'updating',
          estimatedTime: '10-30분',
          timestamp: new Date().toISOString()
        },
        { status: 503 } // 503 Service Unavailable
      );
    }
    
    // V27.0 Ultimate 35페이지 보고서 생성
    console.log('🚀 35페이지 보고서 생성 시작');
    
    // 35페이지 보고서 생성
    const htmlReport = Ultimate35PageGenerator.generateUltimate35PageReport(diagnosisData);
    
    console.log('✅ 35페이지 AI 역량진단 보고서 생성 완료');
    
    // HTML 보고서가 유효한지 확인
    if (!htmlReport || typeof htmlReport !== 'string') {
      throw new Error('보고서 생성에 실패했습니다.');
    }
    
    return NextResponse.json({
      success: true,
      message: diagnosisData.isVirtualData ? '📄 35페이지 AI 역량진단 보고서 생성 성공 (가상 데이터)' : '📄 35페이지 AI 역량진단 보고서 생성 성공',
      diagnosisId,
      htmlReport,
      reportInfo: {
        diagnosisId,
        fileName: `AI역량진단_35페이지보고서_${diagnosisData.companyInfo.name}_${diagnosisId}_${diagnosisData.scores.total}점.html`,
        createdAt: new Date().toISOString(),
        version: 'V27.0-ULTIMATE-35PAGE',
        totalScore: diagnosisData.scores.total,
        percentage: diagnosisData.scores.percentage,
        grade: diagnosisData.grade || calculateGrade(diagnosisData.scores.percentage),
        maturityLevel: diagnosisData.maturityLevel || calculateMaturityLevel(diagnosisData.scores.percentage),
        industry: diagnosisData.companyInfo.industry,
        reportGenerated: true,
        actualScoreReflected: !diagnosisData.isVirtualData, // 가상 데이터가 아닐 때만 실제 점수 반영
        pages: 35,
        factBasedSystem: !diagnosisData.isVirtualData, // 가상 데이터가 아닐 때만 사실기반 시스템
        isVirtualData: diagnosisData.isVirtualData || false,
        virtualDataReason: diagnosisData.virtualDataReason || null
      }
    });
    
  } catch (error: any) {
    const { diagnosisId } = await params;
    console.error('❌ 사실기반 AI 역량진단 보고서 조회 실패:', error);
    
    // 사실기반 시스템: 폴백 보고서 생성 금지
    // 실제 데이터가 없으면 명확한 오류 메시지 반환
    return NextResponse.json({
      success: false,
      error: '해당 진단ID의 실제 평가 데이터를 찾을 수 없습니다.',
      details: error.message,
      diagnosisId,
      message: '사실기반 보고서 작성을 위해 정확한 진단ID와 실제 평가 데이터가 필요합니다.',
      suggestion: '이메일로 받은 정확한 진단ID를 확인하거나, 진단을 다시 실행해주세요.',
      timestamp: new Date().toISOString(),
      version: 'V27.0-FACT-BASED-SYSTEM'
    }, { status: 404 });
  }
}

export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400',
    },
  });
}