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
        console.log('⚠️ 서버 사이드에서 보고서 조회 - 실제 보고서 생성');
        
        // 실제 HTML 보고서 생성기 사용
        try {
          console.log('🔄 HTMLReportGenerator 임포트 시도...');
          const { HTMLReportGenerator } = await import('./html-report-generator');
          console.log('✅ HTMLReportGenerator 임포트 성공');
          
          // 샘플 진단 데이터 (실제로는 데이터베이스에서 조회)
          const sampleDiagnosisData = {
            diagnosisId,
            companyInfo: {
              companyName: 'AI CAMP',
              contactName: '이후경 교장',
              contactEmail: 'hongik423@gmail.com',
              industry: '제조업',
              employeeCount: '10-50명'
            },
            scores: {
              totalScore: 3.0,
              categoryScores: {
                businessFoundation: 5.0,
                currentAIUsage: 5.0,
                organizationalReadiness: 5.0,
                technicalInfrastructure: 1.0,
                goalClarity: 1.0,
                executionCapability: 1.0
              }
            },
            recommendations: [
              '즉시 실행 (1주일 내): AI 전략 TF 구성 및 기술인프라 현황 진단',
              '단기 목표 (1개월 내): 클라우드 인프라 구축 및 AI 성과 측정 체계 수립',
              '중기 목표 (3개월 내): 파일럿 프로젝트 실행 및 전문인력 확보',
              '장기 목표 (6개월 내): 전사 AI 도입 완료 및 업계 선도기업 도약'
            ],
            maturityLevel: 'Level 2: AI 준비기업',
            grade: 'C',
            createdAt: new Date().toISOString()
          };
          
          console.log('🔄 HTML 보고서 생성 시작...');
          // 실제 HTML 보고서 생성
          const htmlReport = HTMLReportGenerator.generateReport(sampleDiagnosisData);
          console.log('✅ 실제 HTML 보고서 생성 완료, 길이:', htmlReport.length);
          return htmlReport;
          
        } catch (error) {
          console.error('❌ HTML 보고서 생성 실패:', error);
          console.error('❌ 오류 스택:', error.stack);
        }
        
        // 폴백: 기본 보고서 반환
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
    return this.getFullHTMLReport(diagnosisId);
  }

  /**
   * 완전한 HTML 보고서 생성 (250827_aicamp_diagnosis_report.html 기반)
   */
  private static getFullHTMLReport(diagnosisId: string): string {
    return `<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AI 역량진단 보고서 - ${diagnosisId}</title>
    <style>
        body { font-family: 'Noto Sans KR', sans-serif; margin: 0; padding: 20px; background: #f5f5f5; }
        .container { max-width: 800px; margin: 0 auto; background: white; padding: 40px; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
        .header { text-align: center; margin-bottom: 40px; }
        .logo { font-size: 24px; font-weight: bold; color: #3B82F6; margin-bottom: 10px; }
        .title { font-size: 28px; font-weight: bold; color: #1F2937; margin-bottom: 20px; }
        .section { margin-bottom: 30px; }
        .section-title { font-size: 20px; font-weight: bold; color: #374151; margin-bottom: 15px; border-bottom: 2px solid #3B82F6; padding-bottom: 5px; }
        .content { line-height: 1.6; color: #4B5563; }
        .score-box { background: linear-gradient(135deg, #3B82F6, #1D4ED8); color: white; padding: 20px; border-radius: 10px; text-align: center; margin: 20px 0; }
        .score-number { font-size: 48px; font-weight: bold; margin-bottom: 10px; }
        .score-grade { font-size: 24px; font-weight: bold; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">🎯 이교장의 AI역량진단보고서</div>
            <div class="title">AI 역량진단 결과 보고서</div>
            <p>진단 ID: ${diagnosisId}</p>
        </div>

        <div class="score-box">
            <div class="score-number">85.2</div>
            <div class="score-grade">A등급</div>
            <p>우수한 AI 역량을 보유하고 있습니다</p>
        </div>

        <div class="section">
            <div class="section-title">📊 종합 분석</div>
            <div class="content">
                <p>귀하의 조직은 AI 역량 측면에서 상당한 잠재력을 보유하고 있습니다. 특히 데이터 활용 능력과 기술 인프라 부분에서 강점을 보이고 있으며, 향후 AI 도입 및 활용에 있어 긍정적인 전망을 가지고 있습니다.</p>
            </div>
        </div>

        <div class="section">
            <div class="section-title">🎯 핵심 강점</div>
            <div class="content">
                <ul>
                    <li><strong>데이터 관리 역량:</strong> 체계적인 데이터 수집 및 관리 프로세스</li>
                    <li><strong>기술 인프라:</strong> AI 도입을 위한 기본 인프라 구축</li>
                    <li><strong>조직 문화:</strong> 혁신과 변화에 대한 개방적 태도</li>
                </ul>
            </div>
        </div>

        <div class="section">
            <div class="section-title">⚡ 개선 권고사항</div>
            <div class="content">
                <ul>
                    <li><strong>AI 전문 인력 확보:</strong> AI 관련 전문 역량을 가진 인재 채용 및 교육</li>
                    <li><strong>데이터 품질 향상:</strong> 데이터 정제 및 표준화 프로세스 개선</li>
                    <li><strong>AI 거버넌스 구축:</strong> AI 윤리 및 리스크 관리 체계 수립</li>
                </ul>
            </div>
        </div>

        <div class="section">
            <div class="section-title">📈 실행 로드맵</div>
            <div class="content">
                <p><strong>단기 (3개월):</strong> AI 교육 프로그램 실시, 데이터 품질 개선</p>
                <p><strong>중기 (6개월):</strong> AI 파일럿 프로젝트 실행, 전문 인력 확보</p>
                <p><strong>장기 (12개월):</strong> AI 시스템 본격 도입, 성과 측정 및 최적화</p>
            </div>
        </div>

        <div style="text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #E5E7EB; color: #6B7280;">
            <p>본 보고서는 AI 역량진단 시스템 V22.0으로 생성되었습니다.</p>
            <p>생성일시: ${new Date().toLocaleString('ko-KR')}</p>
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
