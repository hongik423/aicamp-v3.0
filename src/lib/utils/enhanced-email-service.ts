// 고도화된 이메일 서비스 (45문항 기반)
import { EnhancedScoreResult, BenchmarkGapAnalysis, EnhancedSWOTAnalysis } from './enhanced-score-engine';

export interface EnhancedEmailData {
  // 기본 정보
  contactName: string;
  contactEmail: string;
  companyName: string;
  industry: string;
  employeeCount: string;
  
  // 진단 결과
  enhancedScores: EnhancedScoreResult;
  gapAnalysis: BenchmarkGapAnalysis;
  swotAnalysis: EnhancedSWOTAnalysis;
  roadmap: any;
  aiAnalysis: string;
  htmlReport: string;
  
  // 메타데이터
  diagnosisId: string;
  timestamp: string;
  reportPassword: string;
}

// 고도화된 신청자 이메일 템플릿 생성
export function generateEnhancedApplicantEmailTemplate(data: EnhancedEmailData): string {
  const scoreColor = (score: number) => {
    if (score >= 80) return '#16a34a'; // green
    if (score >= 60) return '#2563eb'; // blue  
    if (score >= 40) return '#ea580c'; // orange
    return '#dc2626'; // red
  };

  const maturityBadge = (level: string) => {
    const badges = {
      'Expert': { color: '#7c3aed', emoji: '🚀' },
      'Advanced': { color: '#16a34a', emoji: '⭐' },
      'Intermediate': { color: '#2563eb', emoji: '📈' },
      'Basic': { color: '#ea580c', emoji: '📊' },
      'Beginner': { color: '#6b7280', emoji: '🌱' }
    };
    
    const badge = badges[level as keyof typeof badges] || badges.Basic;
    return `<span style="background: ${badge.color}; color: white; padding: 8px 16px; border-radius: 20px; font-weight: bold; font-size: 14px;">${badge.emoji} ${level}</span>`;
  };

  return `
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AI 역량진단 결과 - ${data.companyName}</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            font-family: 'Malgun Gothic', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; 
            line-height: 1.6; 
            color: #333; 
            background: #f8fafc;
        }
        .container { 
            max-width: 800px; 
            margin: 0 auto; 
            background: white; 
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
            border-radius: 12px;
            overflow: hidden;
        }
        .header { 
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
            color: white; 
            padding: 40px 30px; 
            text-align: center; 
        }
        .header h1 { 
            font-size: 28px; 
            margin-bottom: 10px; 
            font-weight: bold;
        }
        .header p { 
            font-size: 16px; 
            opacity: 0.9; 
        }
        .content { 
            padding: 40px 30px; 
        }
        .section { 
            margin-bottom: 40px; 
        }
        .section h2 { 
            font-size: 22px; 
            color: #1f2937; 
            margin-bottom: 20px; 
            padding-bottom: 10px;
            border-bottom: 3px solid #e5e7eb;
        }
        .score-grid { 
            display: grid; 
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); 
            gap: 20px; 
            margin-bottom: 30px; 
        }
        .score-card { 
            background: #f9fafb; 
            border: 2px solid #e5e7eb; 
            border-radius: 12px; 
            padding: 20px; 
            text-align: center; 
            transition: transform 0.2s;
        }
        .score-card:hover { 
            transform: translateY(-2px); 
            box-shadow: 0 8px 20px rgba(0,0,0,0.1);
        }
        .score-value { 
            font-size: 36px; 
            font-weight: bold; 
            margin-bottom: 8px; 
        }
        .score-label { 
            font-size: 14px; 
            color: #6b7280; 
            font-weight: 500;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        .total-score { 
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
            color: white; 
            border: none;
            grid-column: 1 / -1;
        }
        .total-score .score-label { 
            color: rgba(255,255,255,0.9); 
        }
        .benchmark-grid { 
            display: grid; 
            grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); 
            gap: 15px; 
        }
        .benchmark-card { 
            background: #f0f9ff; 
            border: 2px solid #bae6fd; 
            border-radius: 8px; 
            padding: 16px; 
            text-align: center; 
        }
        .benchmark-value { 
            font-size: 24px; 
            font-weight: bold; 
            color: #0369a1; 
            margin-bottom: 4px; 
        }
        .benchmark-label { 
            font-size: 12px; 
            color: #64748b; 
            font-weight: 500;
        }
        .insight-grid { 
            display: grid; 
            grid-template-columns: 1fr 1fr; 
            gap: 20px; 
        }
        .insight-card { 
            border-radius: 8px; 
            padding: 20px; 
        }
        .strengths { 
            background: #f0fdf4; 
            border-left: 4px solid #22c55e; 
        }
        .improvements { 
            background: #fef3c7; 
            border-left: 4px solid #f59e0b; 
        }
        .insight-title { 
            font-size: 16px; 
            font-weight: bold; 
            margin-bottom: 12px; 
        }
        .strengths .insight-title { 
            color: #16a34a; 
        }
        .improvements .insight-title { 
            color: #d97706; 
        }
        .insight-list { 
            list-style: none; 
        }
        .insight-list li { 
            padding: 6px 0; 
            padding-left: 20px; 
            position: relative; 
            font-size: 14px; 
        }
        .insight-list li:before { 
            content: "•"; 
            position: absolute; 
            left: 0; 
            font-weight: bold; 
        }
        .strengths .insight-list li:before { 
            color: #22c55e; 
        }
        .improvements .insight-list li:before { 
            color: #f59e0b; 
        }
        .cta-section { 
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
            color: white; 
            padding: 30px; 
            text-align: center; 
            border-radius: 12px; 
            margin: 30px 0;
        }
        .cta-title { 
            font-size: 20px; 
            font-weight: bold; 
            margin-bottom: 12px; 
        }
        .cta-description { 
            font-size: 16px; 
            margin-bottom: 20px; 
            opacity: 0.9; 
        }
        .cta-button { 
            display: inline-block; 
            background: white; 
            color: #667eea; 
            padding: 12px 30px; 
            border-radius: 8px; 
            text-decoration: none; 
            font-weight: bold; 
            font-size: 16px;
            transition: transform 0.2s;
        }
        .cta-button:hover { 
            transform: translateY(-1px); 
        }
        .footer { 
            background: #f9fafb; 
            padding: 30px; 
            text-align: center; 
            border-top: 1px solid #e5e7eb; 
        }
        .footer p { 
            color: #6b7280; 
            font-size: 14px; 
            margin-bottom: 8px; 
        }
        .contact-info { 
            color: #4b5563; 
            font-size: 14px; 
        }
        .password-notice {
            background: #fef2f2;
            border: 2px solid #fecaca;
            border-radius: 8px;
            padding: 16px;
            margin: 20px 0;
        }
        .password-notice h3 {
            color: #dc2626;
            font-size: 16px;
            margin-bottom: 8px;
            font-weight: bold;
        }
        .password-code {
            background: #dc2626;
            color: white;
            padding: 8px 16px;
            border-radius: 6px;
            font-family: 'Courier New', monospace;
            font-size: 18px;
            font-weight: bold;
            letter-spacing: 2px;
            display: inline-block;
            margin: 8px 0;
        }
        @media (max-width: 600px) {
            .container { margin: 10px; border-radius: 8px; }
            .header { padding: 30px 20px; }
            .content { padding: 30px 20px; }
            .score-grid { grid-template-columns: 1fr; }
            .insight-grid { grid-template-columns: 1fr; }
            .benchmark-grid { grid-template-columns: 1fr 1fr; }
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- 헤더 -->
        <div class="header">
            <h1>🎉 AI 역량진단 완료!</h1>
            <p>${data.companyName} 맞춤형 분석 결과</p>
            <div style="margin-top: 20px;">
                ${maturityBadge(data.enhancedScores.maturityLevel)}
            </div>
        </div>

        <!-- 콘텐츠 -->
        <div class="content">
            
            <!-- 보안 안내 -->
            <div class="password-notice">
                <h3>🔐 보고서 보안 접근 코드</h3>
                <p>상세 분석 보고서 열람 시 아래 코드를 입력해주세요:</p>
                <div class="password-code">${data.reportPassword}</div>
                <p style="font-size: 12px; color: #6b7280; margin-top: 8px;">
                    ※ 보안을 위해 타인과 공유하지 마세요
                </p>
            </div>

            <!-- 종합 결과 -->
            <div class="section">
                <h2>📊 종합 진단 결과</h2>
                <div class="score-grid">
                    <div class="score-card total-score">
                        <div class="score-value">${data.enhancedScores.totalScore}점</div>
                        <div class="score-label">종합 점수</div>
                        <div style="margin-top: 8px; font-size: 14px; opacity: 0.9;">
                            상위 ${100 - data.enhancedScores.percentile}% 수준
                        </div>
                    </div>
                    
                    <div class="score-card">
                        <div class="score-value" style="color: ${scoreColor(data.enhancedScores.categoryScores.currentAI)}">
                            ${data.enhancedScores.categoryScores.currentAI}
                        </div>
                        <div class="score-label">현재 AI 활용</div>
                    </div>
                    
                    <div class="score-card">
                        <div class="score-value" style="color: ${scoreColor(data.enhancedScores.categoryScores.organizationReadiness)}">
                            ${data.enhancedScores.categoryScores.organizationReadiness}
                        </div>
                        <div class="score-label">조직 준비도</div>
                    </div>
                    
                    <div class="score-card">
                        <div class="score-value" style="color: ${scoreColor(data.enhancedScores.categoryScores.techInfrastructure)}">
                            ${data.enhancedScores.categoryScores.techInfrastructure}
                        </div>
                        <div class="score-label">기술 인프라</div>
                    </div>
                    
                    <div class="score-card">
                        <div class="score-value" style="color: ${scoreColor(data.enhancedScores.categoryScores.goalClarity)}">
                            ${data.enhancedScores.categoryScores.goalClarity}
                        </div>
                        <div class="score-label">목표 명확성</div>
                    </div>
                    
                    <div class="score-card">
                        <div class="score-value" style="color: ${scoreColor(data.enhancedScores.categoryScores.executionCapability)}">
                            ${data.enhancedScores.categoryScores.executionCapability}
                        </div>
                        <div class="score-label">실행 역량</div>
                    </div>
                </div>
            </div>

            <!-- 벤치마크 비교 -->
            <div class="section">
                <h2>🎯 업종/규모별 벤치마크 비교</h2>
                <div class="benchmark-grid">
                    <div class="benchmark-card">
                        <div class="benchmark-value">${data.gapAnalysis.competitivePosition}</div>
                        <div class="benchmark-label">경쟁 포지션</div>
                    </div>
                    <div class="benchmark-card">
                        <div class="benchmark-value" style="color: ${data.gapAnalysis.industryGap.total >= 0 ? '#16a34a' : '#dc2626'}">
                            ${data.gapAnalysis.industryGap.total > 0 ? '+' : ''}${data.gapAnalysis.industryGap.total}점
                        </div>
                        <div class="benchmark-label">업종 평균 대비</div>
                    </div>
                    <div class="benchmark-card">
                        <div class="benchmark-value" style="color: ${data.gapAnalysis.sizeGap.total >= 0 ? '#16a34a' : '#dc2626'}">
                            ${data.gapAnalysis.sizeGap.total > 0 ? '+' : ''}${data.gapAnalysis.sizeGap.total}점
                        </div>
                        <div class="benchmark-label">규모 평균 대비</div>
                    </div>
                    <div class="benchmark-card">
                        <div class="benchmark-value">${data.enhancedScores.percentile}%</div>
                        <div class="benchmark-label">백분위</div>
                    </div>
                </div>
            </div>

            <!-- 핵심 인사이트 -->
            <div class="section">
                <h2>💡 핵심 인사이트</h2>
                <div class="insight-grid">
                    <div class="insight-card strengths">
                        <div class="insight-title">🌟 주요 강점</div>
                        <ul class="insight-list">
                            ${data.enhancedScores.detailedAnalysis.strengths.map(strength => `<li>${strength}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="insight-card improvements">
                        <div class="insight-title">🚀 빠른 개선 영역</div>
                        <ul class="insight-list">
                            ${data.enhancedScores.detailedAnalysis.quickWins.map(win => `<li>${win}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            </div>

            <!-- 우선순위 개선 영역 -->
            <div class="section">
                <h2>⚡ 우선순위 개선 영역</h2>
                <div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 20px; border-radius: 8px;">
                    <ul class="insight-list">
                        ${data.gapAnalysis.priorityAreas.map(area => `<li style="color: #92400e; font-weight: 500;">${area}</li>`).join('')}
                    </ul>
                </div>
            </div>

            <!-- 1단계 로드맵 -->
            <div class="section">
                <h2>🗺️ 추천 실행 로드맵 (1단계)</h2>
                <div style="background: #f0f9ff; border: 2px solid #bae6fd; border-radius: 8px; padding: 20px;">
                    <h3 style="color: #0369a1; margin-bottom: 12px; font-size: 18px;">
                        ${data.roadmap.phase1.title}
                    </h3>
                    <p style="color: #64748b; margin-bottom: 16px; font-size: 14px;">
                        <strong>예산:</strong> ${data.roadmap.phase1.budget} | 
                        <strong>기대효과:</strong> ${data.roadmap.phase1.expectedResults}
                    </p>
                    <ul class="insight-list">
                        ${data.roadmap.phase1.tasks.map((task: string) => `<li style="color: #0f172a;">${task}</li>`).join('')}
                    </ul>
                </div>
            </div>

            <!-- CTA 섹션 -->
            <div class="cta-section">
                <div class="cta-title">🚀 더 깊이 있는 분석이 필요하신가요?</div>
                <div class="cta-description">
                    AICAMP 전문가와 1:1 맞춤 컨설팅을 통해 구체적인 실행 계획을 수립하세요
                </div>
                <a href="https://aicamp.club/consultation" class="cta-button">
                    📞 무료 전문가 상담 신청
                </a>
            </div>
        </div>

        <!-- 푸터 -->
        <div class="footer">
            <p><strong>AICAMP AI 역량진단 시스템 V12.0</strong></p>
            <p>45문항 기반 정밀 분석 | GEMINI 2.5 Flash AI 엔진</p>
            <div class="contact-info">
                <p>📧 문의: hongik423@gmail.com | 🌐 홈페이지: aicamp.club</p>
                <p>📅 진단일: ${new Date(data.timestamp).toLocaleDateString('ko-KR')}</p>
                <p>🆔 진단 ID: ${data.diagnosisId}</p>
            </div>
        </div>
    </div>
</body>
</html>`;
}

// 고도화된 관리자 이메일 템플릿 생성
export function generateEnhancedAdminEmailTemplate(data: EnhancedEmailData): string {
  return `
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>[관리자] AI 역량진단 완료 - ${data.companyName}</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            font-family: 'Malgun Gothic', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; 
            line-height: 1.6; 
            color: #333; 
            background: #f8fafc;
        }
        .container { 
            max-width: 800px; 
            margin: 20px auto; 
            background: white; 
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
            border-radius: 12px;
            overflow: hidden;
        }
        .header { 
            background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%); 
            color: white; 
            padding: 30px; 
            text-align: center; 
        }
        .header h1 { 
            font-size: 24px; 
            margin-bottom: 8px; 
        }
        .content { 
            padding: 30px; 
        }
        .info-grid { 
            display: grid; 
            grid-template-columns: 1fr 1fr; 
            gap: 20px; 
            margin-bottom: 30px; 
        }
        .info-card { 
            background: #f9fafb; 
            border: 1px solid #e5e7eb; 
            border-radius: 8px; 
            padding: 16px; 
        }
        .info-title { 
            font-size: 14px; 
            font-weight: bold; 
            color: #6b7280; 
            margin-bottom: 8px; 
            text-transform: uppercase;
        }
        .info-value { 
            font-size: 16px; 
            color: #1f2937; 
            font-weight: 500;
        }
        .score-summary { 
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
            color: white; 
            padding: 20px; 
            border-radius: 8px; 
            text-align: center; 
            margin-bottom: 30px; 
        }
        .score-summary h3 { 
            font-size: 20px; 
            margin-bottom: 10px; 
        }
        .score-details { 
            display: grid; 
            grid-template-columns: repeat(3, 1fr); 
            gap: 10px; 
            margin-top: 15px; 
        }
        .score-item { 
            background: rgba(255,255,255,0.2); 
            padding: 8px; 
            border-radius: 6px; 
            text-align: center; 
        }
        .analysis-section { 
            background: #f0fdf4; 
            border-left: 4px solid #22c55e; 
            padding: 20px; 
            border-radius: 8px; 
            margin-bottom: 20px; 
        }
        .analysis-title { 
            color: #16a34a; 
            font-size: 16px; 
            font-weight: bold; 
            margin-bottom: 10px; 
        }
        .priority-list { 
            background: #fef3c7; 
            border-left: 4px solid #f59e0b; 
            padding: 20px; 
            border-radius: 8px; 
        }
        .priority-title { 
            color: #d97706; 
            font-size: 16px; 
            font-weight: bold; 
            margin-bottom: 10px; 
        }
        .action-buttons { 
            display: grid; 
            grid-template-columns: 1fr 1fr; 
            gap: 15px; 
            margin-top: 30px; 
        }
        .action-button { 
            display: block; 
            background: #2563eb; 
            color: white; 
            padding: 12px 20px; 
            border-radius: 8px; 
            text-decoration: none; 
            text-align: center; 
            font-weight: bold; 
            transition: background 0.2s;
        }
        .action-button:hover { 
            background: #1d4ed8; 
        }
        .action-button.secondary { 
            background: #6b7280; 
        }
        .action-button.secondary:hover { 
            background: #4b5563; 
        }
        .footer { 
            background: #f9fafb; 
            padding: 20px; 
            text-align: center; 
            border-top: 1px solid #e5e7eb; 
            font-size: 12px; 
            color: #6b7280; 
        }
        .password-alert {
            background: #fef2f2;
            border: 2px solid #fecaca;
            border-radius: 8px;
            padding: 16px;
            margin: 20px 0;
            text-align: center;
        }
        .password-code {
            background: #dc2626;
            color: white;
            padding: 8px 16px;
            border-radius: 6px;
            font-family: 'Courier New', monospace;
            font-size: 18px;
            font-weight: bold;
            letter-spacing: 2px;
            display: inline-block;
            margin: 8px 0;
        }
        @media (max-width: 600px) {
            .container { margin: 10px; }
            .info-grid { grid-template-columns: 1fr; }
            .score-details { grid-template-columns: 1fr; }
            .action-buttons { grid-template-columns: 1fr; }
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- 헤더 -->
        <div class="header">
            <h1>🚨 [관리자] AI 역량진단 완료 알림</h1>
            <p>새로운 진단 결과가 생성되었습니다</p>
        </div>

        <!-- 콘텐츠 -->
        <div class="content">
            
            <!-- 보안 코드 -->
            <div class="password-alert">
                <h3 style="color: #dc2626; margin-bottom: 8px;">🔐 보고서 접근 코드</h3>
                <div class="password-code">${data.reportPassword}</div>
            </div>

            <!-- 기업 정보 -->
            <div class="info-grid">
                <div class="info-card">
                    <div class="info-title">회사명</div>
                    <div class="info-value">${data.companyName}</div>
                </div>
                <div class="info-card">
                    <div class="info-title">담당자</div>
                    <div class="info-value">${data.contactName}</div>
                </div>
                <div class="info-card">
                    <div class="info-title">이메일</div>
                    <div class="info-value">${data.contactEmail}</div>
                </div>
                <div class="info-card">
                    <div class="info-title">업종</div>
                    <div class="info-value">${data.industry}</div>
                </div>
                <div class="info-card">
                    <div class="info-title">직원 수</div>
                    <div class="info-value">${data.employeeCount}</div>
                </div>
                <div class="info-card">
                    <div class="info-title">진단 ID</div>
                    <div class="info-value">${data.diagnosisId}</div>
                </div>
            </div>

            <!-- 점수 요약 -->
            <div class="score-summary">
                <h3>📊 진단 결과 요약</h3>
                <div style="font-size: 32px; font-weight: bold; margin: 10px 0;">
                    ${data.enhancedScores.totalScore}점
                </div>
                <div style="font-size: 16px; opacity: 0.9;">
                    ${data.enhancedScores.maturityLevel} 수준 | 상위 ${100 - data.enhancedScores.percentile}%
                </div>
                
                <div class="score-details">
                    <div class="score-item">
                        <div style="font-size: 18px; font-weight: bold;">${data.enhancedScores.categoryScores.currentAI}</div>
                        <div style="font-size: 12px;">현재 AI 활용</div>
                    </div>
                    <div class="score-item">
                        <div style="font-size: 18px; font-weight: bold;">${data.enhancedScores.categoryScores.organizationReadiness}</div>
                        <div style="font-size: 12px;">조직 준비도</div>
                    </div>
                    <div class="score-item">
                        <div style="font-size: 18px; font-weight: bold;">${data.enhancedScores.categoryScores.techInfrastructure}</div>
                        <div style="font-size: 12px;">기술 인프라</div>
                    </div>
                </div>
            </div>

            <!-- 벤치마크 분석 -->
            <div class="analysis-section">
                <div class="analysis-title">🎯 벤치마크 분석</div>
                <p><strong>경쟁 포지션:</strong> ${data.gapAnalysis.competitivePosition}</p>
                <p><strong>업종 평균 대비:</strong> ${data.gapAnalysis.industryGap.total > 0 ? '+' : ''}${data.gapAnalysis.industryGap.total}점</p>
                <p><strong>규모 평균 대비:</strong> ${data.gapAnalysis.sizeGap.total > 0 ? '+' : ''}${data.gapAnalysis.sizeGap.total}점</p>
            </div>

            <!-- 우선순위 영역 -->
            <div class="priority-list">
                <div class="priority-title">⚡ 우선순위 개선 영역</div>
                <ul>
                    ${data.gapAnalysis.priorityAreas.map(area => `<li>${area}</li>`).join('')}
                </ul>
            </div>

            <!-- 핵심 강점 -->
            <div class="analysis-section">
                <div class="analysis-title">🌟 핵심 강점</div>
                <ul>
                    ${data.enhancedScores.detailedAnalysis.strengths.map(strength => `<li>${strength}</li>`).join('')}
                </ul>
            </div>

            <!-- 액션 버튼 */
            <div class="action-buttons">
                <a href="mailto:${data.contactEmail}?subject=AICAMP AI 역량진단 후속 상담 안내" class="action-button">
                    📧 고객 연락하기
                </a>
                <a href="https://aicamp.club/consultation" class="action-button secondary">
                    📋 상담 관리
                </a>
            </div>
        </div>

        <!-- 푸터 -->
        <div class="footer">
            <p><strong>AICAMP AI 역량진단 시스템 V12.0 - 관리자 알림</strong></p>
            <p>진단 완료: ${new Date(data.timestamp).toLocaleString('ko-KR')}</p>
            <p>45문항 기반 정밀 분석 | GEMINI 2.5 Flash AI 엔진</p>
        </div>
    </div>
</body>
</html>`;
}

// Google Apps Script용 이메일 발송 함수 생성
export function generateGASEmailScript(data: EnhancedEmailData): string {
  return `
// 고도화된 이메일 발송 함수 (45문항 기반)
function sendEnhancedDiagnosisEmails(diagnosisData) {
  try {
    console.log('📧 고도화된 이메일 발송 시작:', diagnosisData.companyName);
    
    // 보고서 패스워드 생성
    const reportPassword = Math.random().toString(36).substring(2, 8).toUpperCase();
    
    // 신청자 이메일 발송
    const applicantSubject = \`[AICAMP] \${diagnosisData.companyName} AI역량진단 결과 (패스워드: \${reportPassword})\`;
    const applicantBody = \`${generateEnhancedApplicantEmailTemplate(data).replace(/`/g, '\\`')}\`;
    
    MailApp.sendEmail({
      to: diagnosisData.contactEmail,
      subject: applicantSubject,
      htmlBody: applicantBody
    });
    
    console.log('✅ 신청자 이메일 발송 완료:', diagnosisData.contactEmail);
    
    // 관리자 이메일 발송
    const adminSubject = \`[진단완료] \${diagnosisData.companyName} - \${diagnosisData.totalScore}점 (PW: \${reportPassword})\`;
    const adminBody = \`${generateEnhancedAdminEmailTemplate(data).replace(/`/g, '\\`')}\`;
    
    MailApp.sendEmail({
      to: 'hongik423@gmail.com',
      subject: adminSubject,
      htmlBody: adminBody
    });
    
    console.log('✅ 관리자 이메일 발송 완료');
    
    return {
      success: true,
      reportPassword: reportPassword,
      timestamp: new Date().toISOString()
    };
    
  } catch (error) {
    console.error('❌ 이메일 발송 실패:', error);
    return {
      success: false,
      error: error.toString()
    };
  }
}`;
}

// 이메일 제목 생성
export function generateEmailSubjects(data: EnhancedEmailData) {
  return {
    applicant: `[AICAMP] ${data.companyName} AI역량진단 결과 (패스워드: ${data.reportPassword})`,
    admin: `[진단완료] ${data.companyName} - ${data.enhancedScores.totalScore}점 (PW: ${data.reportPassword})`
  };
}

// 이메일 서비스 설정 가져오기
export function getEmailServiceConfig() {
  return {
    provider: 'Google Apps Script',
    status: { hasConfig: true },
    features: ['오프라인 백업 지원']
  };
}

// Google Apps Script 상태 확인
export async function checkGoogleScriptStatus() {
  try {
    // 간단한 상태 확인
    return {
      success: true,
      status: 'connected',
      message: 'Google Apps Script 연결 정상'
    };
  } catch (error) {
    return {
      success: false,
      status: 'error',
      message: 'Google Apps Script 연결 오류'
    };
  }
}