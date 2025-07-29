/**
 * 간단한 Google Apps Script 연결 테스트
 */

const axios = require('axios');

const GAS_URL = 'https://script.google.com/macros/s/AKfycbzYIDWtMiz9mUjuInH981lcKbN4DaXMkYxQ2CHYFMuSW0zd98D6ohdp5NbfdhqLnN0/exec';

async function testGASConnection() {
  console.log('🔗 Google Apps Script 연결 테스트 시작...');
  console.log('URL:', GAS_URL);
  
  try {
    // 1. GET 요청 테스트
    console.log('\n1. GET 요청 테스트:');
    const getResponse = await axios.get(GAS_URL);
    console.log('Status:', getResponse.status);
    console.log('Headers:', getResponse.headers);
    console.log('Data (first 200 chars):', 
      typeof getResponse.data === 'string' 
        ? getResponse.data.substring(0, 200) 
        : JSON.stringify(getResponse.data).substring(0, 200)
    );
    
  } catch (error) {
    console.log('❌ GET 요청 실패:', error.message);
    if (error.response) {
      console.log('Response Status:', error.response.status);
      console.log('Response Data (first 200):', 
        typeof error.response.data === 'string' 
          ? error.response.data.substring(0, 200)
          : JSON.stringify(error.response.data).substring(0, 200)
      );
    }
  }
  
  try {
    // 2. 간단한 POST 요청 테스트
    console.log('\n2. 간단한 POST 요청 테스트:');
    const postData = {
      test: true,
      message: 'Hello from test script'
    };
    
    const postResponse = await axios.post(GAS_URL, postData, {
      headers: {
        'Content-Type': 'application/json'
      },
      timeout: 30000
    });
    
    console.log('Status:', postResponse.status);
    console.log('Data:', postResponse.data);
    
  } catch (error) {
    console.log('❌ POST 요청 실패:', error.message);
    if (error.response) {
      console.log('Response Status:', error.response.status);
      console.log('Response Data (first 500):', 
        typeof error.response.data === 'string' 
          ? error.response.data.substring(0, 500)
          : JSON.stringify(error.response.data).substring(0, 500)
      );
    }
  }
  
  try {
    // 3. 내부 테스트 함수 호출
    console.log('\n3. 내부 테스트 함수 호출:');
    const testData = {
      action: 'internalTest',
      functionName: 'testDiagnosisSubmission'
    };
    
    const testResponse = await axios.post(GAS_URL, testData, {
      headers: {
        'Content-Type': 'application/json'
      },
      timeout: 30000
    });
    
    console.log('Status:', testResponse.status);
    console.log('Response:', testResponse.data);
    
  } catch (error) {
    console.log('❌ 내부 테스트 함수 호출 실패:', error.message);
    if (error.response) {
      console.log('Response Status:', error.response.status);
      console.log('Response Data (first 500):', 
        typeof error.response.data === 'string' 
          ? error.response.data.substring(0, 500)
          : JSON.stringify(error.response.data).substring(0, 500)
      );
    }
  }
}

testGASConnection(); 