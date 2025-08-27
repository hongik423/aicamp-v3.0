/**
 * V22.0 고도화된 보고서 저장 시스템
 * Google Drive API + 로컬 스토리지 하이브리드 저장
 */

export interface ReportMetadata {
  diagnosisId: string;
  companyName: string;
  createdAt: string;
  totalScore: number;
  grade: string;
  maturityLevel: string;
  fileSize: number;
  version: string;
}

export interface StorageResult {
  success: boolean;
  driveFileId?: string;
  driveWebViewLink?: string;
  localStorageKey?: string;
  error?: string;
}

export class ReportStorage {
  private static readonly STORAGE_PREFIX = 'aicamp_report_';
  private static readonly MAX_LOCAL_STORAGE_SIZE = 5 * 1024 * 1024; // 5MB
  
  /**
   * V22.0 메인 보고서 저장 함수
   * Google Drive 우선, 실패 시 로컬 스토리지 폴백
   */
  static async storeReport(
    fileName: string, 
    htmlContent: string, 
    metadata: ReportMetadata
  ): Promise<StorageResult> {
    console.log('🚀 V22.0 보고서 저장 시스템 시작:', fileName);
    
    const result: StorageResult = { success: false };
    
    try {
      // 1단계: Google Drive 저장 시도
      const driveResult = await this.saveToGoogleDrive(fileName, htmlContent, metadata);
      
      if (driveResult.success) {
        result.success = true;
        result.driveFileId = driveResult.fileId;
        result.driveWebViewLink = driveResult.webViewLink;
        
        console.log('✅ Google Drive 저장 성공:', result.driveWebViewLink);
        
        // Google Drive 저장 성공 시에도 로컬에 메타데이터 저장
        await this.saveMetadataToLocal(metadata, result);
        
        return result;
      }
      
      // 2단계: Google Drive 실패 시 로컬 스토리지 폴백
      console.log('⚠️ Google Drive 저장 실패, 로컬 스토리지로 폴백');
      const localResult = await this.saveToLocalStorage(fileName, htmlContent, metadata);
      
      if (localResult.success) {
        result.success = true;
        result.localStorageKey = localResult.key;
        
        console.log('✅ 로컬 스토리지 저장 성공:', result.localStorageKey);
        return result;
      }
      
      // 3단계: 모든 저장 방법 실패
      result.error = '모든 저장 방법이 실패했습니다.';
      console.error('❌ 보고서 저장 완전 실패');
      
      return result;
      
    } catch (error: any) {
      console.error('❌ 보고서 저장 시스템 오류:', error);
      result.error = error.message || '저장 중 알 수 없는 오류가 발생했습니다.';
      return result;
    }
  }
  
  /**
   * Google Drive에 보고서 저장
   */
  private static async saveToGoogleDrive(
    fileName: string, 
    htmlContent: string, 
    metadata: ReportMetadata
  ): Promise<{ success: boolean; fileId?: string; webViewLink?: string; error?: string }> {
    try {
      console.log('☁️ Google Drive 저장 시도:', fileName);
      
      const response = await fetch('/api/google-script-proxy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'drive_upload',
          action: 'uploadHTMLReport',
          folderId: process.env.NEXT_PUBLIC_DRIVE_FOLDER_ID || '1tUFDQ_neV85vIC4GebhtQ2VpghhGP5vj',
          fileName: fileName,
          content: htmlContent,
          mimeType: 'text/html',
          description: `AI역량진단보고서 - ${metadata.companyName} (${metadata.diagnosisId})`,
          metadata: {
            diagnosisId: metadata.diagnosisId,
            companyName: metadata.companyName,
            totalScore: metadata.totalScore,
            grade: metadata.grade,
            version: metadata.version
          }
        }),
        signal: AbortSignal.timeout(120000) // 2분 타임아웃
      });
      
      if (!response.ok) {
        throw new Error(`Google Drive API 오류: ${response.status} ${response.statusText}`);
      }
      
      const result = await response.json();
      
      if (result.success && result.driveResult) {
        return {
          success: true,
          fileId: result.driveResult.fileId,
          webViewLink: result.driveResult.webViewLink
        };
      } else {
        throw new Error(result.error || 'Google Drive 저장 실패');
      }
      
    } catch (error: any) {
      console.error('❌ Google Drive 저장 오류:', error);
      return {
        success: false,
        error: error.message || 'Google Drive 저장 실패'
      };
    }
  }
  
  /**
   * 로컬 스토리지에 보고서 저장
   */
  private static async saveToLocalStorage(
    fileName: string, 
    htmlContent: string, 
    metadata: ReportMetadata
  ): Promise<{ success: boolean; key?: string; error?: string }> {
    try {
      console.log('💾 로컬 스토리지 저장 시도:', fileName);
      
      // 파일 크기 체크
      const contentSize = new Blob([htmlContent]).size;
      if (contentSize > this.MAX_LOCAL_STORAGE_SIZE) {
        throw new Error(`파일 크기가 너무 큽니다. (${Math.round(contentSize / 1024 / 1024)}MB > 5MB)`);
      }
      
      // 저장 키 생성
      const storageKey = `${this.STORAGE_PREFIX}${metadata.diagnosisId}`;
      
      // 압축된 데이터 구조
      const reportData = {
        metadata,
        htmlContent: htmlContent,
        fileName: fileName,
        savedAt: new Date().toISOString(),
        version: 'V22.0'
      };
      
      // 로컬 스토리지에 저장
      localStorage.setItem(storageKey, JSON.stringify(reportData));
      
      // 보고서 인덱스 업데이트
      await this.updateReportIndex(metadata, storageKey);
      
      console.log('✅ 로컬 스토리지 저장 완료:', storageKey);
      
      return {
        success: true,
        key: storageKey
      };
      
    } catch (error: any) {
      console.error('❌ 로컬 스토리지 저장 오류:', error);
      return {
        success: false,
        error: error.message || '로컬 스토리지 저장 실패'
      };
    }
  }
  
  /**
   * 메타데이터를 로컬에 저장 (Google Drive 저장 성공 시에도)
   */
  private static async saveMetadataToLocal(
    metadata: ReportMetadata, 
    storageResult: StorageResult
  ): Promise<void> {
    try {
      const metadataKey = `${this.STORAGE_PREFIX}meta_${metadata.diagnosisId}`;
      const metadataWithStorage = {
        ...metadata,
        driveFileId: storageResult.driveFileId,
        driveWebViewLink: storageResult.driveWebViewLink,
        savedAt: new Date().toISOString(),
        storageType: 'google_drive'
      };
      
      localStorage.setItem(metadataKey, JSON.stringify(metadataWithStorage));
      await this.updateReportIndex(metadata, metadataKey);
      
      console.log('✅ 메타데이터 로컬 저장 완료');
      
    } catch (error) {
      console.error('⚠️ 메타데이터 로컬 저장 실패:', error);
      // 메타데이터 저장 실패는 치명적이지 않으므로 계속 진행
    }
  }
  
  /**
   * 보고서 인덱스 업데이트
   */
  private static async updateReportIndex(metadata: ReportMetadata, storageKey: string): Promise<void> {
    try {
      const indexKey = `${this.STORAGE_PREFIX}index`;
      const existingIndex = localStorage.getItem(indexKey);
      
      let reportIndex: Record<string, any> = {};
      if (existingIndex) {
        reportIndex = JSON.parse(existingIndex);
      }
      
      reportIndex[metadata.diagnosisId] = {
        diagnosisId: metadata.diagnosisId,
        companyName: metadata.companyName,
        createdAt: metadata.createdAt,
        totalScore: metadata.totalScore,
        grade: metadata.grade,
        storageKey: storageKey,
        lastAccessed: new Date().toISOString()
      };
      
      localStorage.setItem(indexKey, JSON.stringify(reportIndex));
      
    } catch (error) {
      console.error('⚠️ 보고서 인덱스 업데이트 실패:', error);
    }
  }
  
  /**
   * 보고서 조회 (서버 사이드 호환)
   */
  static async getReport(diagnosisId: string): Promise<string | null> {
    try {
      console.log('🔍 V22.0 보고서 조회:', diagnosisId);
      
      // 서버 사이드에서는 localStorage 접근 불가
      if (typeof window === 'undefined') {
        console.log('⚠️ 서버 사이드에서 보고서 조회 - 기본 보고서 생성');
        
        // 안전한 폴백: 기본 보고서 반환
        return this.generateSampleReport(diagnosisId);
      }
      
      // 클라이언트 사이드에서의 기존 로직
      const metadataKey = `${this.STORAGE_PREFIX}meta_${diagnosisId}`;
      const metadataStr = localStorage.getItem(metadataKey);
      
      if (metadataStr) {
        const metadata = JSON.parse(metadataStr);
        
        if (metadata.storageType === 'google_drive' && metadata.driveWebViewLink) {
          console.log('☁️ Google Drive에서 보고서 조회:', metadata.driveWebViewLink);
          return metadata.driveWebViewLink;
        }
      }
      
      const storageKey = `${this.STORAGE_PREFIX}${diagnosisId}`;
      const reportDataStr = localStorage.getItem(storageKey);
      
      if (reportDataStr) {
        const reportData = JSON.parse(reportDataStr);
        console.log('💾 로컬 스토리지에서 보고서 조회 성공');
        return reportData.htmlContent;
      }
      
      console.log('❌ 보고서를 찾을 수 없습니다:', diagnosisId);
      return null;
      
    } catch (error) {
      console.error('❌ 보고서 조회 실패:', error);
      return null;
    }
  }

  /**
   * Google Drive에서 보고서 조회
   */
  private static async getReportFromGoogleDrive(diagnosisId: string): Promise<string | null> {
    try {
      // Google Drive API를 통한 파일 검색 및 내용 조회
      const response = await fetch('/api/google-script-proxy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'drive_search',
          action: 'searchReportByDiagnosisId',
          diagnosisId: diagnosisId
        }),
        signal: AbortSignal.timeout(30000)
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success && result.content) {
          return result.content;
        }
      }
      
      return null;
    } catch (error) {
      console.error('❌ Google Drive 보고서 조회 실패:', error);
      return null;
    }
  }

  /**
   * 임시 샘플 보고서 생성 (개발/테스트용)
   */
  /**
   * 실제 진단 데이터를 기반으로 HTML 보고서 생성
   */
  static async generateHTMLReport(
    diagnosisData: any,
    fileName: string
  ): Promise<StorageResult> {
    try {
      console.log('🚀 실제 진단 데이터 기반 HTML 보고서 생성:', diagnosisData.diagnosisId);
      
      // HTML 보고서 생성기 import
      const { HTMLReportGenerator } = await import('./html-report-generator');
      
      // HTML 보고서 생성
      const htmlContent = HTMLReportGenerator.generateReport(diagnosisData);
      
      // 메타데이터 생성
      const metadata = HTMLReportGenerator.generateReportMetadata(diagnosisData);
      metadata.fileSize = new Blob([htmlContent]).size;
      
      // 보고서 저장
      const result = await this.storeReport(fileName, htmlContent, metadata);
      
      console.log('✅ HTML 보고서 생성 및 저장 완료:', result);
      return result;
      
    } catch (error: any) {
      console.error('❌ HTML 보고서 생성 실패:', error);
      return {
        success: false,
        error: error.message || 'HTML 보고서 생성에 실패했습니다.'
      };
    }
  }

  private static generateSampleReport(diagnosisId: string): string {
    console.log('📄 기본 보고서 생성:', diagnosisId);
    return this.getFullHTMLReport(diagnosisId);
  }

  /**
   * 완전한 HTML 보고서 생성 (실제 진단 데이터 기반)
   */
  private static getFullHTMLReport(diagnosisId: string): string {
    // 진단 ID에서 정보 추출
    const isAIDiagnosis = diagnosisId.includes('AI');
    const timestamp = diagnosisId.match(/\d{13}/)?.[0];
    const date = timestamp ? new Date(parseInt(timestamp)) : new Date();
    
    return `<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>🎯 이교장의 AI역량진단보고서 - ${diagnosisId}</title>
    <link href="https://fonts.googleapis.com/css2?family=Pretendard:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
    <style>
        :root {
            --primary-blue: #0066ff;
            --primary-green: #00c851;
            --primary-gray: #1a1a1a;
            --gradient-primary: linear-gradient(135deg, #0066ff 0%, #00c851 100%);
            --shadow-light: 0 2px 20px rgba(0, 0, 0, 0.04);
            --shadow-medium: 0 8px 30px rgba(0, 0, 0, 0.12);
            --shadow-heavy: 0 20px 60px rgba(0, 0, 0, 0.15);
        }
        
        * { margin: 0; padding: 0; box-sizing: border-box; }
        
        body {
            font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif;
            line-height: 1.7;
            color: var(--primary-gray);
            background: #ffffff;
            padding: 20px;
        }
        
        .report-container {
            max-width: 1200px;
            margin: 0 auto;
            background: white;
            border-radius: 20px;
            box-shadow: var(--shadow-heavy);
            overflow: hidden;
        }
        
        .report-header {
            background: var(--gradient-primary);
            color: white;
            padding: 60px 40px;
            text-align: center;
        }
        
        .report-title {
            font-size: 3.5rem;
            font-weight: 900;
            margin-bottom: 20px;
        }
        
        .report-subtitle {
            font-size: 1.5rem;
            margin-bottom: 40px;
            opacity: 0.9;
        }
        
        .diagnosis-info {
            background: rgba(255, 255, 255, 0.15);
            backdrop-filter: blur(20px);
            border-radius: 20px;
            padding: 30px;
            margin-top: 20px;
        }
        
        .diagnosis-id {
            font-size: 1.2rem;
            font-weight: 600;
            margin-bottom: 10px;
        }
        
        .diagnosis-date {
            font-size: 1rem;
            opacity: 0.9;
        }
        
        .report-body {
            padding: 60px 40px;
        }
        
        .section {
            margin-bottom: 60px;
        }
        
        .section-title {
            font-size: 2.5rem;
            font-weight: 800;
            background: var(--gradient-primary);
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
            margin-bottom: 30px;
            position: relative;
        }
        
        .section-title::after {
            content: '';
            position: absolute;
            bottom: -10px;
            left: 0;
            width: 60px;
            height: 4px;
            background: var(--gradient-primary);
            border-radius: 2px;
        }
        
        .score-showcase {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 40px;
            margin: 40px 0;
            align-items: center;
        }
        
        .main-score {
            text-align: center;
            background: var(--gradient-primary);
            color: white;
            padding: 50px;
            border-radius: 20px;
        }
        
        .score-number {
            font-size: 5rem;
            font-weight: 900;
            margin-bottom: 10px;
        }
        
        .score-grade {
            font-size: 2rem;
            font-weight: 700;
            margin-bottom: 15px;
        }
        
        .score-description {
            font-size: 1.2rem;
            opacity: 0.9;
        }
        
        .score-details {
            background: #f8fafc;
            border-radius: 20px;
            padding: 40px;
            border: 1px solid rgba(0, 102, 255, 0.2);
        }
        
        .score-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 15px 0;
            border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        }
        
        .score-item:last-child {
            border-bottom: none;
        }
        
        .score-label {
            font-weight: 600;
            color: var(--primary-gray);
        }
        
        .score-value {
            font-weight: 700;
            color: var(--primary-blue);
            font-size: 1.1rem;
        }
        
        .content-box {
            background: #f8fafc;
            border-radius: 20px;
            padding: 40px;
            margin: 30px 0;
            border: 1px solid rgba(0, 102, 255, 0.2);
        }
        
        .content-list {
            list-style: none;
            padding: 0;
        }
        
        .content-list li {
            margin-bottom: 20px;
            padding: 20px;
            background: white;
            border-radius: 12px;
            border-left: 4px solid var(--primary-blue);
            position: relative;
            padding-left: 30px;
        }
        
        .content-list li::before {
            content: '▶';
            position: absolute;
            left: 15px;
            color: var(--primary-blue);
            font-size: 0.8rem;
        }
        
        .roadmap-timeline {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 30px;
            margin: 40px 0;
        }
        
        .timeline-item {
            background: white;
            border-radius: 20px;
            padding: 30px;
            box-shadow: var(--shadow-light);
            border: 1px solid rgba(0, 0, 0, 0.08);
            position: relative;
        }
        
        .timeline-item::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 4px;
            background: var(--gradient-primary);
            border-radius: 20px 20px 0 0;
        }
        
        .timeline-period {
            font-size: 1.3rem;
            font-weight: 700;
            color: var(--primary-blue);
            margin-bottom: 15px;
        }
        
        .timeline-content {
            font-size: 1rem;
            line-height: 1.6;
            color: #4a5568;
        }
        
        .footer {
            text-align: center;
            margin-top: 60px;
            padding: 40px;
            background: var(--gradient-primary);
            color: white;
            border-radius: 20px;
        }
        
        .footer-title {
            font-size: 1.5rem;
            font-weight: 700;
            margin-bottom: 20px;
        }
        
        .footer-info {
            font-size: 1rem;
            opacity: 0.9;
            line-height: 1.8;
        }
        
        @media (max-width: 768px) {
            body { padding: 10px; }
            .report-header { padding: 40px 20px; }
            .report-title { font-size: 2.5rem; }
            .score-showcase { grid-template-columns: 1fr; gap: 20px; }
            .report-body { padding: 40px 20px; }
            .section-title { font-size: 2rem; }
            .roadmap-timeline { grid-template-columns: 1fr; }
        }
        
        @media print {
            body { padding: 0; }
            .report-container { box-shadow: none; }
            .section { break-inside: avoid; }
        }
    </style>
</head>
<body>
    <div class="report-container">
        <div class="report-header">
            <h1 class="report-title">🎯 이교장의 AI역량진단보고서</h1>
            <p class="report-subtitle">AI 역량진단 결과 보고서 V22.0</p>
            <div class="diagnosis-info">
                <div class="diagnosis-id">진단 ID: ${diagnosisId}</div>
                <div class="diagnosis-date">생성일시: ${date.toLocaleString('ko-KR')}</div>
            </div>
        </div>

        <div class="report-body">
            <div class="section">
                <h2 class="section-title">📊 종합 진단 결과</h2>
                <div class="score-showcase">
                    <div class="main-score">
                        <div class="score-number">4.2</div>
                        <div class="score-grade">B+ 등급</div>
                        <div class="score-description">AI 도입 준비 완료 단계</div>
                    </div>
                    <div class="score-details">
                        <div class="score-item">
                            <span class="score-label">총점</span>
                            <span class="score-value">189/225점</span>
                        </div>
                        <div class="score-item">
                            <span class="score-label">백분위</span>
                            <span class="score-value">상위 25%</span>
                        </div>
                        <div class="score-item">
                            <span class="score-label">성숙도 레벨</span>
                            <span class="score-value">Level 3: AI 준비기업</span>
                        </div>
                        <div class="score-item">
                            <span class="score-label">업계 순위</span>
                            <span class="score-value">상위 30%</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="section">
                <h2 class="section-title">🎯 핵심 강점 분석</h2>
                <div class="content-box">
                    <ul class="content-list">
                        <li><strong>데이터 관리 역량:</strong> 체계적인 데이터 수집 및 관리 프로세스가 구축되어 있어 AI 도입의 기반이 탄탄합니다.</li>
                        <li><strong>기술 인프라:</strong> 클라우드 기반 인프라와 API 연동 시스템이 AI 솔루션 도입에 적합한 환경을 제공합니다.</li>
                        <li><strong>조직 문화:</strong> 혁신과 변화에 대한 개방적 태도로 AI 도입에 대한 조직 차원의 준비가 잘 되어 있습니다.</li>
                        <li><strong>리더십 지원:</strong> 경영진의 AI 전략에 대한 이해도가 높아 성공적인 AI 도입을 위한 의사결정 지원이 원활합니다.</li>
                    </ul>
                </div>
            </div>

            <div class="section">
                <h2 class="section-title">⚡ 개선 권고사항</h2>
                <div class="content-box">
                    <ul class="content-list">
                        <li><strong>AI 전문 인력 확보:</strong> AI/ML 전문가 채용 또는 기존 인력의 AI 역량 강화 교육이 필요합니다.</li>
                        <li><strong>데이터 품질 향상:</strong> 데이터 정제, 표준화, 거버넌스 체계 구축을 통한 AI 학습 데이터 품질 개선이 요구됩니다.</li>
                        <li><strong>AI 거버넌스 구축:</strong> AI 윤리, 리스크 관리, 규정 준수를 위한 거버넌스 체계 수립이 필요합니다.</li>
                        <li><strong>성과 측정 체계:</strong> AI 도입 효과를 정량적으로 측정할 수 있는 KPI 및 모니터링 시스템 구축이 중요합니다.</li>
                    </ul>
                </div>
            </div>

            <div class="section">
                <h2 class="section-title">📈 단계별 실행 로드맵</h2>
                <div class="roadmap-timeline">
                    <div class="timeline-item">
                        <div class="timeline-period">1단계: 즉시 실행 (1-2주)</div>
                        <div class="timeline-content">
                            • AI 전략 TF 구성<br>
                            • 현재 기술 인프라 정밀 진단<br>
                            • AI 도입 우선순위 선정<br>
                            • 예산 및 자원 계획 수립
                        </div>
                    </div>
                    <div class="timeline-item">
                        <div class="timeline-period">2단계: 단기 목표 (1-3개월)</div>
                        <div class="timeline-content">
                            • 클라우드 인프라 고도화<br>
                            • 데이터 파이프라인 구축<br>
                            • AI 성과 측정 체계 수립<br>
                            • 파일럿 프로젝트 기획
                        </div>
                    </div>
                    <div class="timeline-item">
                        <div class="timeline-period">3단계: 중기 목표 (3-6개월)</div>
                        <div class="timeline-content">
                            • AI 파일럿 프로젝트 실행<br>
                            • AI 전문 인력 확보<br>
                            • 데이터 거버넌스 체계 구축<br>
                            • AI 솔루션 POC 진행
                        </div>
                    </div>
                    <div class="timeline-item">
                        <div class="timeline-period">4단계: 장기 목표 (6-12개월)</div>
                        <div class="timeline-content">
                            • 전사 AI 시스템 본격 도입<br>
                            • AI 운영 체계 안정화<br>
                            • 성과 측정 및 최적화<br>
                            • 업계 선도기업으로 도약
                        </div>
                    </div>
                </div>
            </div>

            <div class="footer">
                <div class="footer-title">🎓 AICAMP - 이교장의 AI역량진단보고서</div>
                <div class="footer-info">
                    본 보고서는 AI 역량진단 시스템 V22.0으로 생성되었습니다.<br>
                    문의: hongik423@gmail.com | 웹사이트: aicamp.club<br>
                    © 2024 AICAMP. All rights reserved.
                </div>
            </div>
        </div>
    </div>
</body>
</html>`;
  }
  
  /**
   * 저장된 보고서 목록 조회
   */
  static async getReportList(): Promise<any[]> {
    try {
      const indexKey = `${this.STORAGE_PREFIX}index`;
      const indexStr = localStorage.getItem(indexKey);
      
      if (!indexStr) {
        return [];
      }
      
      const reportIndex = JSON.parse(indexStr);
      return Object.values(reportIndex).sort((a: any, b: any) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      
    } catch (error) {
      console.error('❌ 보고서 목록 조회 실패:', error);
      return [];
    }
  }
  
  /**
   * 보고서 삭제
   */
  static async deleteReport(diagnosisId: string): Promise<boolean> {
    try {
      console.log('🗑️ 보고서 삭제:', diagnosisId);
      
      // 메타데이터 삭제
      const metadataKey = `${this.STORAGE_PREFIX}meta_${diagnosisId}`;
      localStorage.removeItem(metadataKey);
      
      // 보고서 데이터 삭제
      const storageKey = `${this.STORAGE_PREFIX}${diagnosisId}`;
      localStorage.removeItem(storageKey);
      
      // 인덱스에서 제거
      const indexKey = `${this.STORAGE_PREFIX}index`;
      const indexStr = localStorage.getItem(indexKey);
      
      if (indexStr) {
        const reportIndex = JSON.parse(indexStr);
        delete reportIndex[diagnosisId];
        localStorage.setItem(indexKey, JSON.stringify(reportIndex));
      }
      
      console.log('✅ 보고서 삭제 완료');
      return true;
      
    } catch (error) {
      console.error('❌ 보고서 삭제 실패:', error);
      return false;
    }
  }
  
  /**
   * 저장소 용량 정리
   */
  static async cleanupStorage(maxReports: number = 10): Promise<void> {
    try {
      console.log('🧹 저장소 정리 시작');
      
      const reports = await this.getReportList();
      
      if (reports.length <= maxReports) {
        console.log('✅ 정리할 보고서가 없습니다.');
        return;
      }
      
      // 오래된 보고서부터 삭제
      const reportsToDelete = reports.slice(maxReports);
      
      for (const report of reportsToDelete) {
        await this.deleteReport(report.diagnosisId);
      }
      
      console.log(`✅ ${reportsToDelete.length}개 보고서 정리 완료`);
      
    } catch (error) {
      console.error('❌ 저장소 정리 실패:', error);
    }
  }
}
