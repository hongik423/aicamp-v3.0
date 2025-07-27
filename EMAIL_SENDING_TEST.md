# 📧 AI CAMP 이메일 발송 시스템 테스트 가이드

## 🚀 Google Apps Script 업데이트 완료 후 테스트

### 1️⃣ 상담신청 이메일 테스트
```bash
curl -X POST http://localhost:3000/api/consultation \
  -H "Content-Type: application/json" \
  -d '{
    "name": "이메일테스트",
    "phone": "010-1234-5678", 
    "email": "hongik423@gmail.com",
    "company": "AI CAMP 테스트",
    "position": "대표",
    "consultationType": "phone",
    "industry": "AI",
    "message": "이메일 발송 테스트입니다",
    "preferredTime": "morning",
    "privacyConsent": true
  }'
```

### 2️⃣ 무료진단 + PDF 이메일 테스트  
```bash
curl -X POST http://localhost:3000/api/simplified-diagnosis \
  -H "Content-Type: application/json" \
  -d '{
    "companyName": "이메일테스트회사",
    "industry": "IT",
    "contactManager": "이메일테스트담당자", 
    "email": "hongik423@gmail.com",
    "employeeCount": "10-50",
    "growthStage": "성장기",
    "businessLocation": "서울",
    "mainConcerns": "이메일 발송 테스트",
    "expectedBenefits": "PDF 보고서 수신 확인",
    "submitDate": "2025-07-27",
    "planning_level": 4,
    "differentiation_level": 3,
    "pricing_level": 4,
    "expertise_level": 5,
    "quality_level": 4,
    "customer_greeting": 3,
    "customer_service": 4,
    "complaint_management": 3,
    "customer_retention": 4,
    "customer_understanding": 3,
    "marketing_planning": 2,
    "offline_marketing": 2,
    "online_marketing": 3,
    "sales_strategy": 3,
    "purchase_management": 4,
    "inventory_management": 4,
    "exterior_management": 3,
    "interior_management": 4,
    "cleanliness": 5,
    "work_flow": 4,
    "privacyConsent": true
  }'
```

## 📋 확인사항 체크리스트

### ✅ 상담신청 후 확인
- [ ] 신청자(`hongik423@gmail.com`)에게 접수확인 메일 도착
- [ ] 관리자(`hongik423@gmail.com`)에게 신청알림 메일 도착
- [ ] 이메일 제목에 `[AI CAMP]` 포함
- [ ] 이메일 발송자명이 `AI CAMP` 또는 `AI CAMP 상담알림`

### ✅ 무료진단 후 확인  
- [ ] 신청자에게 접수확인 메일 도착
- [ ] **신청자에게 PDF 진단보고서 첨부 메일 도착** ⭐
- [ ] 관리자에게 진단완료 알림 메일 도착  
- [ ] PDF 파일이 정상적으로 첨부되어 있음
- [ ] PDF 내용에 진단 결과와 AI 도입 가이드라인 포함

### ⚠️ 문제 발생 시 확인사항
1. **Gmail 스팸함 확인**
2. **Google Apps Script 실행 로그 확인**
3. **환경변수 `ADMIN_EMAIL` 설정 확인**
4. **Gmail API 권한 승인 상태 확인**

## 🎯 성공 기준
**✅ 무오류 달성 조건**:
- 상담신청 시: 신청자 + 관리자 각각 1통씩 총 2통 메일 발송
- 무료진단 시: 신청자 접수확인 + PDF보고서 + 관리자 알림 총 3통 메일 발송
- 모든 메일에 `[AI CAMP]` 브랜딩 적용
- PDF 첨부파일 정상 생성 및 발송

---

**📧 이메일 발송 시스템 준비 완료!**  
**Google Apps Script 업데이트만 완료하면 즉시 작동 가능한 상태입니다.** 