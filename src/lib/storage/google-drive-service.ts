/**
 * 🗂️ Google Drive 연동 서비스
 * HTML 보고서를 Google Drive 공유 폴더에 저장
 */

export interface DriveUploadConfig {
  folderId: string;
  fileName: string;
  content: string;
  mimeType: string;
  description?: string;
}

export interface DriveUploadResult {
  success: boolean;
  fileId?: string;
  fileName?: string;
  webViewLink?: string;
  webContentLink?: string;
  error?: string;
}

export interface DriveFileInfo {
  id: string;
  name: string;
  webViewLink: string;
  webContentLink: string;
  createdTime: string;
  modifiedTime: string;
  size: string;
}

/**
 * Google Drive 서비스 클래스
 */
export class GoogleDriveService {
  private readonly DRIVE_FOLDER_ID = '1tUFDQ_neV85vIC4GebhtQ2VpghhGP5vj';
  private readonly DRIVE_API_BASE = 'https://www.googleapis.com/drive/v3';
  private readonly UPLOAD_API_BASE = 'https://www.googleapis.com/upload/drive/v3';
  
  /**
   * HTML 보고서를 Google Drive에 업로드
   */
  async uploadHTMLReport(
    fileName: string,
    htmlContent: string,
    description?: string
  ): Promise<DriveUploadResult> {
    
    console.log(`🗂️ Google Drive 업로드 시작: ${fileName}`);
    
    try {
      // 파일명 정규화 (특수문자 제거)
      const sanitizedFileName = this.sanitizeFileName(fileName);
      
      // 업로드 설정
      const uploadConfig: DriveUploadConfig = {
        folderId: this.DRIVE_FOLDER_ID,
        fileName: sanitizedFileName,
        content: htmlContent,
        mimeType: 'text/html',
        description: description || `이교장의AI역량진단보고서 - ${new Date().toLocaleDateString('ko-KR')}`
      };
      
      // Google Apps Script를 통한 업로드 (프록시 방식)
      const result = await this.uploadViaGAS(uploadConfig);
      
      if (result.success) {
        console.log(`✅ Google Drive 업로드 성공: ${result.fileName}`);
        console.log(`🔗 공유 링크: ${result.webViewLink}`);
      } else {
        console.error(`❌ Google Drive 업로드 실패: ${result.error}`);
      }
      
      return result;
      
    } catch (error) {
      console.error('Google Drive 업로드 중 오류:', error);
      
      return {
        success: false,
        error: error instanceof Error ? error.message : '알 수 없는 오류'
      };
    }
  }
  
  /**
   * Google Apps Script를 통한 업로드 (프록시 방식)
   */
  private async uploadViaGAS(config: DriveUploadConfig): Promise<DriveUploadResult> {
    try {
      // 현재 도메인 감지
      const baseUrl = typeof window !== 'undefined' 
        ? window.location.origin 
        : 'https://aicamp.club';
      
      const response = await fetch(`${baseUrl}/api/google-script-proxy`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'drive_upload',
          action: 'uploadHTMLReport',
          folderId: config.folderId,
          fileName: config.fileName,
          content: config.content,
          mimeType: config.mimeType,
          description: config.description
        }),
        signal: AbortSignal.timeout(120000) // 2분 타임아웃
      });
      
      if (!response.ok) {
        throw new Error(`GAS 프록시 오류: ${response.status} ${response.statusText}`);
      }
      
      const result = await response.json();
      
      if (result.success && result.driveResult) {
        return {
          success: true,
          fileId: result.driveResult.fileId,
          fileName: result.driveResult.fileName,
          webViewLink: result.driveResult.webViewLink,
          webContentLink: result.driveResult.webContentLink
        };
      } else {
        return {
          success: false,
          error: result.error || 'GAS 업로드 실패'
        };
      }
      
    } catch (error) {
      console.error('GAS 프록시를 통한 업로드 실패:', error);
      
      return {
        success: false,
        error: error instanceof Error ? error.message : 'GAS 프록시 오류'
      };
    }
  }
  
  /**
   * 폴더 내 파일 목록 조회
   */
  async listReportsInFolder(): Promise<DriveFileInfo[]> {
    try {
      const baseUrl = typeof window !== 'undefined' 
        ? window.location.origin 
        : 'https://aicamp.club';
      
      const response = await fetch(`${baseUrl}/api/google-script-proxy`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'drive_list',
          action: 'listFiles',
          folderId: this.DRIVE_FOLDER_ID
        }),
        signal: AbortSignal.timeout(30000) // 30초 타임아웃
      });
      
      if (!response.ok) {
        throw new Error(`파일 목록 조회 실패: ${response.status}`);
      }
      
      const result = await response.json();
      
      if (result.success && result.files) {
        return result.files;
      } else {
        console.warn('파일 목록 조회 실패:', result.error);
        return [];
      }
      
    } catch (error) {
      console.error('파일 목록 조회 중 오류:', error);
      return [];
    }
  }
  
  /**
   * 파일명 정규화
   */
  private sanitizeFileName(fileName: string): string {
    // 특수문자 제거 및 안전한 파일명 생성
    return fileName
      .replace(/[<>:"/\\|?*]/g, '_') // 특수문자를 언더스코어로 변경
      .replace(/\s+/g, '_') // 공백을 언더스코어로 변경
      .replace(/_+/g, '_') // 연속된 언더스코어를 하나로 변경
      .replace(/^_|_$/g, '') // 시작과 끝의 언더스코어 제거
      .substring(0, 100); // 길이 제한 (100자)
  }
  
  /**
   * 진단 보고서 파일명 생성
   */
  generateReportFileName(companyName: string, diagnosisId: string): string {
    const timestamp = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    return `${companyName}_이교장의AI역량진단보고서_${diagnosisId}_${timestamp}.html`;
  }
  
  /**
   * 공유 링크 생성
   */
  generateShareableLink(fileId: string): string {
    return `https://drive.google.com/file/d/${fileId}/view?usp=sharing`;
  }
  
  /**
   * 다운로드 링크 생성
   */
  generateDownloadLink(fileId: string): string {
    return `https://drive.google.com/uc?export=download&id=${fileId}`;
  }
  
  /**
   * 폴더 공유 링크
   */
  getFolderShareLink(): string {
    return `https://drive.google.com/drive/folders/${this.DRIVE_FOLDER_ID}?usp=sharing`;
  }
  
  /**
   * 업로드 상태 확인
   */
  async checkUploadStatus(fileId: string): Promise<{
    exists: boolean;
    accessible: boolean;
    info?: DriveFileInfo;
  }> {
    try {
      const baseUrl = typeof window !== 'undefined' 
        ? window.location.origin 
        : 'https://aicamp.club';
      
      const response = await fetch(`${baseUrl}/api/google-script-proxy`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'drive_check',
          action: 'checkFile',
          fileId: fileId
        }),
        signal: AbortSignal.timeout(15000) // 15초 타임아웃
      });
      
      if (!response.ok) {
        return { exists: false, accessible: false };
      }
      
      const result = await response.json();
      
      return {
        exists: result.exists || false,
        accessible: result.accessible || false,
        info: result.fileInfo
      };
      
    } catch (error) {
      console.error('파일 상태 확인 중 오류:', error);
      return { exists: false, accessible: false };
    }
  }
}

/**
 * Google Drive 서비스 인스턴스
 */
export const googleDriveService = new GoogleDriveService();

/**
 * 편의 함수들
 */
export async function uploadDiagnosisReport(
  companyName: string,
  diagnosisId: string,
  htmlContent: string
): Promise<DriveUploadResult> {
  const fileName = googleDriveService.generateReportFileName(companyName, diagnosisId);
  const description = `이교장의 AI역량진단보고서 - ${companyName} (${diagnosisId})`;
  
  return await googleDriveService.uploadHTMLReport(fileName, htmlContent, description);
}

export async function getReportsList(): Promise<DriveFileInfo[]> {
  return await googleDriveService.listReportsInFolder();
}

export function getSharedFolderLink(): string {
  return googleDriveService.getFolderShareLink();
}
