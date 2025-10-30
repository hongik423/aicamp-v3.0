/**
 * 호스트 컴퓨터 상태 모니터링 시스템
 * 로컬 Ollama 서버 상태를 실시간으로 모니터링하고 다운타임을 추적
 */

interface HostStatus {
  isOnline: boolean;
  lastSeen: Date;
  downtimeStart?: Date;
  downtimeDuration?: number; // 분 단위
  uptimePercentage: number;
  totalDowntime: number; // 분 단위
  statusMessage: string;
  estimatedRecoveryTime?: Date;
}

interface DowntimeRecord {
  startTime: Date;
  endTime?: Date;
  duration?: number; // 분 단위
  reason: 'host_offline' | 'ollama_error' | 'network_issue' | 'unknown';
  userImpact: number; // 영향받은 사용자 수
}

class HostStatusMonitor {
  private static instance: HostStatusMonitor;
  private status: HostStatus;
  private downtimeRecords: DowntimeRecord[] = [];
  private checkInterval: NodeJS.Timeout | null = null;
  private readonly CHECK_INTERVAL = 30000; // 30초마다 체크
  private readonly DOWNTIME_THRESHOLD = 2; // 2분 이상 다운타임 시 알림

  private constructor() {
    this.status = {
      isOnline: false,
      lastSeen: new Date(),
      uptimePercentage: 100,
      totalDowntime: 0,
      statusMessage: '호스트 컴퓨터 상태 확인 중...'
    };
  }

  static getInstance(): HostStatusMonitor {
    if (!HostStatusMonitor.instance) {
      HostStatusMonitor.instance = new HostStatusMonitor();
    }
    return HostStatusMonitor.instance;
  }

  /**
   * 호스트 컴퓨터 상태 확인
   */
  async checkHostStatus(): Promise<HostStatus> {
    try {
      console.log('🔍 호스트 컴퓨터 상태 확인 중...');
      
      // Ollama 서버 상태 확인
      const ollamaResponse = await fetch('http://localhost:11434/api/tags', {
        method: 'GET',
        signal: AbortSignal.timeout(5000)
      });

      if (ollamaResponse.ok) {
        // 호스트 컴퓨터 온라인
        if (!this.status.isOnline) {
          console.log('✅ 호스트 컴퓨터 온라인 상태로 복구');
          this.handleHostRecovery();
        }
        
        this.status = {
          isOnline: true,
          lastSeen: new Date(),
          uptimePercentage: this.calculateUptimePercentage(),
          totalDowntime: this.status.totalDowntime,
          statusMessage: '호스트 컴퓨터 정상 작동 중'
        };
        
      } else {
        throw new Error(`Ollama 서버 응답 오류: ${ollamaResponse.status}`);
      }
      
    } catch (error) {
      // 호스트 컴퓨터 오프라인 또는 오류
      if (this.status.isOnline) {
        console.log('❌ 호스트 컴퓨터 오프라인 상태 감지');
        this.handleHostDowntime();
      }
      
      this.status = {
        isOnline: false,
        lastSeen: this.status.lastSeen,
        downtimeStart: this.status.downtimeStart || new Date(),
        downtimeDuration: this.calculateDowntimeDuration(),
        uptimePercentage: this.calculateUptimePercentage(),
        totalDowntime: this.status.totalDowntime + (this.status.downtimeDuration || 0),
        statusMessage: this.generateDowntimeMessage(),
        estimatedRecoveryTime: this.estimateRecoveryTime()
      };
    }

    return this.status;
  }

  /**
   * 호스트 다운타임 처리
   */
  private handleHostDowntime(): void {
    const downtimeRecord: DowntimeRecord = {
      startTime: new Date(),
      reason: 'host_offline',
      userImpact: 0 // 실제로는 사용자 수를 추적해야 함
    };
    
    this.downtimeRecords.push(downtimeRecord);
    
    console.log('📊 호스트 다운타임 기록:', {
      startTime: downtimeRecord.startTime,
      reason: downtimeRecord.reason
    });
  }

  /**
   * 호스트 복구 처리
   */
  private handleHostRecovery(): void {
    const lastDowntime = this.downtimeRecords[this.downtimeRecords.length - 1];
    if (lastDowntime && !lastDowntime.endTime) {
      lastDowntime.endTime = new Date();
      lastDowntime.duration = Math.round(
        (lastDowntime.endTime.getTime() - lastDowntime.startTime.getTime()) / (1000 * 60)
      );
      
      console.log('🔄 호스트 복구 완료:', {
        duration: lastDowntime.duration,
        totalDowntime: this.status.totalDowntime
      });
    }
  }

  /**
   * 다운타임 지속 시간 계산 (분 단위)
   */
  private calculateDowntimeDuration(): number {
    if (!this.status.downtimeStart) return 0;
    
    const now = new Date();
    return Math.round((now.getTime() - this.status.downtimeStart.getTime()) / (1000 * 60));
  }

  /**
   * 가동률 계산
   */
  private calculateUptimePercentage(): number {
    const totalMinutes = 24 * 60; // 24시간
    const downtimeMinutes = this.status.totalDowntime;
    return Math.max(0, Math.round(((totalMinutes - downtimeMinutes) / totalMinutes) * 100));
  }

  /**
   * 복구 예상 시간 추정
   */
  private estimateRecoveryTime(): Date {
    const now = new Date();
    const estimatedMinutes = 30; // 평균 30분 후 복구 예상
    return new Date(now.getTime() + estimatedMinutes * 60 * 1000);
  }

  /**
   * 다운타임 메시지 생성
   */
  private generateDowntimeMessage(): string {
    const duration = this.status.downtimeDuration || 0;
    
    if (duration < 1) {
      return '호스트 컴퓨터 서버가 일시적으로 중단되었습니다. 잠시 후 다시 시도해주세요.';
    } else if (duration < 5) {
      return `호스트 컴퓨터 서버가 ${duration}분간 중단되었습니다. 곧 복구될 예정입니다.`;
    } else if (duration < 30) {
      return `호스트 컴퓨터 서버가 ${duration}분간 중단되었습니다. 서버 관리자에게 문의하거나 이메일 신청을 해주세요.`;
    } else {
      return `호스트 컴퓨터 서버가 ${duration}분간 중단되었습니다. 서버 관리자에게 긴급 문의하거나 이메일 신청을 해주세요.`;
    }
  }

  /**
   * 모니터링 시작
   */
  startMonitoring(): void {
    if (this.checkInterval) {
      clearInterval(this.checkInterval);
    }
    
    console.log('🚀 호스트 상태 모니터링 시작');
    
    // 즉시 한 번 체크
    this.checkHostStatus();
    
    // 주기적 체크
    this.checkInterval = setInterval(async () => {
      await this.checkHostStatus();
    }, this.CHECK_INTERVAL);
  }

  /**
   * 모니터링 중지
   */
  stopMonitoring(): void {
    if (this.checkInterval) {
      clearInterval(this.checkInterval);
      this.checkInterval = null;
      console.log('⏹️ 호스트 상태 모니터링 중지');
    }
  }

  /**
   * 현재 상태 반환
   */
  getStatus(): HostStatus {
    return this.status;
  }

  /**
   * 다운타임 기록 반환
   */
  getDowntimeRecords(): DowntimeRecord[] {
    return this.downtimeRecords;
  }

  /**
   * 사용자에게 표시할 상태 정보 반환
   */
  getUserFriendlyStatus(): {
    isOnline: boolean;
    message: string;
    showEmailRequest: boolean;
    estimatedRecoveryTime?: string;
    downtimeDuration?: string;
  } {
    const duration = this.status.downtimeDuration || 0;
    const showEmailRequest = duration >= this.DOWNTIME_THRESHOLD;
    
    return {
      isOnline: this.status.isOnline,
      message: this.status.statusMessage,
      showEmailRequest,
      estimatedRecoveryTime: this.status.estimatedRecoveryTime?.toLocaleString('ko-KR'),
      downtimeDuration: duration > 0 ? `${duration}분` : undefined
    };
  }
}

// 싱글톤 인스턴스 내보내기
export const hostStatusMonitor = HostStatusMonitor.getInstance();

// 서버 시작 시 모니터링 시작
if (typeof window === 'undefined') {
  hostStatusMonitor.startMonitoring();
}
