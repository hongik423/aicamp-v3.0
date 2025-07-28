#!/usr/bin/env node

/**
 * Vercel 환경변수 업로드 스크립트
 * env.local.production 파일의 내용을 Vercel에 업로드
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Vercel 환경변수 업로드 시작...');

// env.local.production 파일 읽기
const envFile = path.join(__dirname, 'env.local.production');
if (!fs.existsSync(envFile)) {
    console.error('❌ env.local.production 파일을 찾을 수 없습니다.');
    process.exit(1);
}

const envContent = fs.readFileSync(envFile, 'utf-8');
const lines = envContent.split('\n');

const envVars = [];

lines.forEach(line => {
    line = line.trim();
    
    // 주석이나 빈 줄 건너뛰기
    if (line.startsWith('#') || line === '' || line.startsWith('=')) {
        return;
    }
    
    // KEY=VALUE 형태의 라인 처리
    const equalIndex = line.indexOf('=');
    if (equalIndex > 0) {
        const key = line.substring(0, equalIndex).trim();
        const value = line.substring(equalIndex + 1).trim();
        
        if (key && value) {
            envVars.push({ key, value });
        }
    }
});

console.log(`📊 발견된 환경변수: ${envVars.length}개`);

// 각 환경변수를 Vercel에 업로드
let successCount = 0;
let errorCount = 0;

for (const { key, value } of envVars) {
    try {
        console.log(`🔧 업로드 중: ${key}`);
        
        // Vercel CLI를 사용하여 환경변수 설정
        const command = `vercel env add ${key} production`;
        
        // 자동으로 값을 입력하기 위해 echo를 사용
        const fullCommand = `echo ${value} | ${command}`;
        
        execSync(fullCommand, { 
            stdio: ['pipe', 'pipe', 'pipe'], 
            encoding: 'utf-8'
        });
        
        console.log(`✅ ${key}: 업로드 완료`);
        successCount++;
        
    } catch (error) {
        console.log(`⚠️ ${key}: 이미 존재하거나 업로드 실패`);
        errorCount++;
    }
}

console.log('\n' + '='.repeat(50));
console.log('📊 Vercel 환경변수 업로드 결과');
console.log('='.repeat(50));
console.log(`✅ 성공: ${successCount}개`);
console.log(`⚠️ 실패/중복: ${errorCount}개`);
console.log(`📊 총계: ${envVars.length}개`);

if (successCount > 0) {
    console.log('\n🎉 환경변수 업로드가 완료되었습니다!');
    console.log('🚀 이제 Vercel 배포를 진행할 수 있습니다.');
} else {
    console.log('\n⚠️ 새로 업로드된 환경변수가 없습니다.');
    console.log('📋 기존 환경변수를 확인하세요: vercel env ls');
} 