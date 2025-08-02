import { google } from 'googleapis';
import { NextResponse } from 'next/server';

// Google Sheets 설정
const SPREADSHEET_ID = process.env.GOOGLE_SPREADSHEET_ID || '1QNgQSsyAdeSu1ejhIm4PFyeSRKy3NmwbLQnKLF8vqA0';

const SHEETS = {
  DIAGNOSIS: 'AI_역량진단신청',
  CONSULTATION: '상담신청',
  BETA_FEEDBACK: '베타피드백',
  DIAGNOSIS_RESULTS: 'AI_역량진단결과',
  DIAGNOSIS_DETAILED: 'AI_역량진단상세결과'
};

// Google Sheets 클라이언트 초기화
async function getGoogleSheetsClient() {
  try {
    // 서비스 계정 인증 정보
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    return sheets;
  } catch (error) {
    console.error('Google Sheets 클라이언트 초기화 오류:', error);
    throw new Error('Google Sheets 연결 실패');
  }
}

// 시트에 데이터 저장
export async function saveToGoogleSheets(sheetName: string, data: any) {
  try {
    const sheets = await getGoogleSheetsClient();
    
    // 데이터를 2D 배열로 변환
    const values = [Object.values(data)];
    
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: `${sheetName}!A:Z`,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: values,
      },
    });

    console.log(`✅ ${sheetName} 시트에 데이터 저장 완료`);
    return response.data;
  } catch (error) {
    console.error(`❌ ${sheetName} 시트 저장 오류:`, error);
    throw new Error('데이터 저장 실패');
  }
}

// 시트 데이터 조회
export async function getSheetData(sheetName: string, range?: string) {
  try {
    const sheets = await getGoogleSheetsClient();
    
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: range || `${sheetName}!A:Z`,
    });

    const rows = response.data.values || [];
    if (rows.length === 0) {
      return [];
    }

    // 첫 번째 행을 헤더로 사용
    const headers = rows[0];
    const data = rows.slice(1).map(row => {
      const obj: any = {};
      headers.forEach((header, index) => {
        obj[header] = row[index] || '';
      });
      return obj;
    });

    return data;
  } catch (error) {
    console.error(`❌ ${sheetName} 시트 조회 오류:`, error);
    throw new Error('데이터 조회 실패');
  }
}

// 특정 행 업데이트
export async function updateSheetRow(sheetName: string, diagnosisId: string, updateData: any) {
  try {
    const sheets = await getGoogleSheetsClient();
    
    // 먼저 해당 진단 ID의 행을 찾기
    const data = await getSheetData(sheetName);
    const rowIndex = data.findIndex((row: any) => row.diagnosisId === diagnosisId);
    
    if (rowIndex === -1) {
      throw new Error('해당 진단 ID를 찾을 수 없습니다.');
    }

    // 업데이트할 값 준비
    const headers = Object.keys(data[0]);
    const values = headers.map(header => updateData[header] || data[rowIndex][header]);
    
    // 행 업데이트 (헤더 행 고려하여 +2)
    const response = await sheets.spreadsheets.values.update({
      spreadsheetId: SPREADSHEET_ID,
      range: `${sheetName}!A${rowIndex + 2}:Z${rowIndex + 2}`,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [values],
      },
    });

    console.log(`✅ ${sheetName} 시트 행 업데이트 완료`);
    return response.data;
  } catch (error) {
    console.error(`❌ ${sheetName} 시트 업데이트 오류:`, error);
    throw new Error('데이터 업데이트 실패');
  }
}

// 시트 구조 확인
export async function checkSheetStructure() {
  try {
    const sheets = await getGoogleSheetsClient();
    
    const response = await sheets.spreadsheets.get({
      spreadsheetId: SPREADSHEET_ID,
    });

    const sheetInfo = response.data.sheets?.map(sheet => ({
      name: sheet.properties?.title,
      id: sheet.properties?.sheetId,
      rowCount: sheet.properties?.gridProperties?.rowCount,
      columnCount: sheet.properties?.gridProperties?.columnCount,
    }));

    return NextResponse.json({
      success: true,
      data: {
        spreadsheetTitle: response.data.properties?.title,
        sheets: sheetInfo,
        spreadsheetUrl: `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/edit`,
      }
    });
  } catch (error) {
    console.error('시트 구조 확인 오류:', error);
    return NextResponse.json(
      { success: false, error: '시트 구조 확인 실패' },
      { status: 500 }
    );
  }
}

// 모든 시트 초기화
export async function initializeAllSheets() {
  try {
    const sheets = await getGoogleSheetsClient();
    const requiredSheets = Object.values(SHEETS);
    
    // 현재 시트 목록 가져오기
    const response = await sheets.spreadsheets.get({
      spreadsheetId: SPREADSHEET_ID,
    });
    
    const existingSheets = response.data.sheets?.map(
      sheet => sheet.properties?.title
    ) || [];

    // 필요한 시트 생성
    const sheetsToCreate = requiredSheets.filter(
      sheetName => !existingSheets.includes(sheetName)
    );

    if (sheetsToCreate.length > 0) {
      const requests = sheetsToCreate.map(sheetName => ({
        addSheet: {
          properties: {
            title: sheetName,
          },
        },
      }));

      await sheets.spreadsheets.batchUpdate({
        spreadsheetId: SPREADSHEET_ID,
        requestBody: {
          requests,
        },
      });

      console.log('✅ 새 시트 생성 완료:', sheetsToCreate.join(', '));
    }

    // 각 시트에 헤더 설정
    await setupSheetHeaders();

    return NextResponse.json({
      success: true,
      data: {
        message: '모든 시트가 초기화되었습니다.',
        createdSheets: sheetsToCreate,
        totalSheets: requiredSheets.length,
      }
    });
  } catch (error) {
    console.error('시트 초기화 오류:', error);
    return NextResponse.json(
      { success: false, error: '시트 초기화 실패' },
      { status: 500 }
    );
  }
}

// 시트 헤더 설정
async function setupSheetHeaders() {
  const headers = {
    [SHEETS.DIAGNOSIS]: [
      'timestamp', 'diagnosisId', 'status', 'companyName', 'industry', 
      'contactManager', 'email', 'phone', 'employeeCount', 'annualRevenue',
      'businessHistory', 'digitalizationLevel', 'aiExperience', 'consultingArea',
      'mainConcerns', 'expectedBenefits', 'additionalQuestions', 'privacyConsent',
      'marketingConsent', 'totalScore', 'aiCapabilityScore', 'practicalCapabilityScore'
    ],
    [SHEETS.CONSULTATION]: [
      'timestamp', 'companyName', 'contactManager', 'email', 'phone',
      'consultingArea', 'currentIssues', 'desiredDate', 'desiredTime',
      'desiredFormat', 'employeeCount', 'annualRevenue', 'businessHistory',
      'mainProducts', 'competitors', 'budget', 'consultingExperience',
      'expectedDuration', 'decisionMaker', 'urgency', 'specificRequests',
      'howDidYouHear', 'privacyConsent', 'marketingConsent', 'status'
    ],
    [SHEETS.BETA_FEEDBACK]: [
      'timestamp', 'name', 'email', 'phone', 'rating', 'feedback',
      'improvements', 'additionalFeatures', 'wouldRecommend', 'testimonial',
      'contactForInterview', 'status'
    ],
    [SHEETS.DIAGNOSIS_RESULTS]: [
      'timestamp', 'diagnosisId', 'status', 'companyName', 'industry',
      'overallScore', 'aiCapabilityScores', 'practicalCapabilityScores',
      'executiveSummary', 'keyFindings', 'swotAnalysis', 'recommendations',
      'roadmap', 'curriculum'
    ],
    [SHEETS.DIAGNOSIS_DETAILED]: [
      'timestamp', 'diagnosisId', 'basicInfo', 'scores', 'detailedAnalysis',
      'strategicRecommendations', 'implementationRoadmap', 'expectedOutcomes',
      'riskMitigation', 'successFactors'
    ]
  };

  const sheets = await getGoogleSheetsClient();

  for (const [sheetName, headerRow] of Object.entries(headers)) {
    try {
      // 헤더가 이미 있는지 확인
      const existingData = await getSheetData(sheetName, `${sheetName}!A1:Z1`);
      
      if (existingData.length === 0) {
        // 헤더 추가
        await sheets.spreadsheets.values.update({
          spreadsheetId: SPREADSHEET_ID,
          range: `${sheetName}!A1:${String.fromCharCode(65 + headerRow.length - 1)}1`,
          valueInputOption: 'USER_ENTERED',
          requestBody: {
            values: [headerRow],
          },
        });
        console.log(`✅ ${sheetName} 헤더 설정 완료`);
      }
    } catch (error) {
      console.error(`❌ ${sheetName} 헤더 설정 오류:`, error);
    }
  }
}

// 최신 진단 데이터 조회
export async function getLatestDiagnosisData() {
  try {
    const data = await getSheetData(SHEETS.DIAGNOSIS);
    
    // 최신 10개 데이터 정렬
    const sortedData = data
      .sort((a: any, b: any) => 
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      )
      .slice(0, 10);

    return NextResponse.json({
      success: true,
      data: {
        totalCount: data.length,
        latestDiagnoses: sortedData,
        summary: {
          todayCount: data.filter((item: any) => 
            new Date(item.timestamp).toDateString() === new Date().toDateString()
          ).length,
          weekCount: data.filter((item: any) => {
            const date = new Date(item.timestamp);
            const weekAgo = new Date();
            weekAgo.setDate(weekAgo.getDate() - 7);
            return date >= weekAgo;
          }).length,
          averageScore: data.reduce((sum: number, item: any) => 
            sum + (parseFloat(item.totalScore) || 0), 0
          ) / data.length || 0
        }
      }
    });
  } catch (error) {
    console.error('최신 진단 데이터 조회 오류:', error);
    return NextResponse.json(
      { success: false, error: '데이터 조회 실패' },
      { status: 500 }
    );
  }
}