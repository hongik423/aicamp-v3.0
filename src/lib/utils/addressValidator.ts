/**
 * 한국 주소 검증 유틸리티
 * 도/시/군/구/동 단계별 주소 정합성 검증
 */

// 한국 행정구역 데이터
export interface AddressLevel {
  code: string;
  name: string;
  children?: AddressLevel[];
}

// 한국 주소 구조
export interface KoreanAddress {
  sido: string;        // 시/도
  sigungu: string;     // 시/군/구  
  eupmyeondong: string; // 읍/면/동
  roadName?: string;   // 도로명
  buildingNumber?: string; // 건물번호
  detailAddress?: string; // 상세주소
}

// 주소 검증 결과
export interface AddressValidationResult {
  isValid: boolean;
  level: 'invalid' | 'sido' | 'sigungu' | 'eupmyeondong' | 'complete';
  message: string;
  suggestions?: string[];
  normalizedAddress?: KoreanAddress;
}

// 시/도 목록
export const SIDO_LIST: AddressLevel[] = [
  { code: '11', name: '서울특별시' },
  { code: '26', name: '부산광역시' },
  { code: '27', name: '대구광역시' },
  { code: '28', name: '인천광역시' },
  { code: '29', name: '광주광역시' },
  { code: '30', name: '대전광역시' },
  { code: '31', name: '울산광역시' },
  { code: '36', name: '세종특별자치시' },
  { code: '41', name: '경기도' },
  { code: '51', name: '강원특별자치도' },
  { code: '43', name: '충청북도' },
  { code: '44', name: '충청남도' },
  { code: '52', name: '전북특별자치도' },
  { code: '46', name: '전라남도' },
  { code: '47', name: '경상북도' },
  { code: '48', name: '경상남도' },
  { code: '50', name: '제주특별자치도' }
];

// 주요 시/군/구 데이터 (실제 운영시에는 전체 데이터 필요)
export const SIGUNGU_DATA: { [key: string]: AddressLevel[] } = {
  '11': [ // 서울특별시
    { code: '110', name: '종로구' },
    { code: '140', name: '중구' },
    { code: '170', name: '용산구' },
    { code: '200', name: '성동구' },
    { code: '215', name: '광진구' },
    { code: '230', name: '동대문구' },
    { code: '260', name: '중랑구' },
    { code: '290', name: '성북구' },
    { code: '305', name: '강북구' },
    { code: '320', name: '도봉구' },
    { code: '350', name: '노원구' },
    { code: '380', name: '은평구' },
    { code: '410', name: '서대문구' },
    { code: '440', name: '마포구' },
    { code: '470', name: '양천구' },
    { code: '500', name: '강서구' },
    { code: '530', name: '구로구' },
    { code: '545', name: '금천구' },
    { code: '560', name: '영등포구' },
    { code: '590', name: '동작구' },
    { code: '620', name: '관악구' },
    { code: '650', name: '서초구' },
    { code: '680', name: '강남구' },
    { code: '710', name: '송파구' },
    { code: '740', name: '강동구' }
  ],
  '26': [ // 부산광역시
    { code: '110', name: '중구' },
    { code: '140', name: '서구' },
    { code: '170', name: '동구' },
    { code: '200', name: '영도구' },
    { code: '230', name: '부산진구' },
    { code: '260', name: '동래구' },
    { code: '290', name: '남구' },
    { code: '320', name: '북구' },
    { code: '350', name: '해운대구' },
    { code: '380', name: '사하구' },
    { code: '410', name: '금정구' },
    { code: '440', name: '강서구' },
    { code: '470', name: '연제구' },
    { code: '500', name: '수영구' },
    { code: '530', name: '사상구' },
    { code: '710', name: '기장군' }
  ],
  '41': [ // 경기도
    { code: '110', name: '수원시' },
    { code: '130', name: '성남시' },
    { code: '150', name: '의정부시' },
    { code: '170', name: '안양시' },
    { code: '190', name: '부천시' },
    { code: '210', name: '광명시' },
    { code: '220', name: '평택시' },
    { code: '250', name: '동두천시' },
    { code: '270', name: '안산시' },
    { code: '280', name: '고양시' },
    { code: '290', name: '과천시' },
    { code: '310', name: '구리시' },
    { code: '360', name: '남양주시' },
    { code: '370', name: '오산시' },
    { code: '390', name: '시흥시' },
    { code: '410', name: '군포시' },
    { code: '430', name: '의왕시' },
    { code: '450', name: '하남시' },
    { code: '460', name: '용인시' },
    { code: '480', name: '파주시' },
    { code: '500', name: '이천시' },
    { code: '550', name: '안성시' },
    { code: '570', name: '김포시' },
    { code: '590', name: '화성시' },
    { code: '610', name: '광주시' },
    { code: '630', name: '양주시' },
    { code: '650', name: '포천시' },
    { code: '670', name: '여주시' },
    { code: '800', name: '연천군' },
    { code: '820', name: '가평군' },
    { code: '830', name: '양평군' }
  ]
  // 다른 시도 데이터도 필요시 추가
};

// 주요 읍/면/동 데이터 (예시 - 서울 강남구)
export const DONG_DATA: { [key: string]: string[] } = {
  '11680': [ // 서울 강남구
    '개포동', '논현동', '대치동', '도곡동', '삼성동', '세곡동', 
    '신사동', '압구정동', '역삼동', '일원동', '자곡동', '청담동'
  ],
  '11650': [ // 서울 서초구
    '내곡동', '반포동', '방배동', '서초동', '양재동', '염곡동', '우면동', '원지동', '잠원동'
  ],
  // 더 많은 데이터 필요시 추가
};

/**
 * 주소 문자열을 파싱하여 구성요소로 분리
 */
export function parseAddress(fullAddress: string): Partial<KoreanAddress> {
  const address = fullAddress.trim();
  const result: Partial<KoreanAddress> = {};

  // 시/도 추출
  const sidoMatch = SIDO_LIST.find(sido => address.includes(sido.name));
  if (sidoMatch) {
    result.sido = sidoMatch.name;
  }

  // 시/군/구 추출 (시/도가 있는 경우)
  if (result.sido) {
    const sidoCode = sidoMatch!.code;
    const sigunguList = SIGUNGU_DATA[sidoCode];
    if (sigunguList) {
      const sigunguMatch = sigunguList.find(sigungu => address.includes(sigungu.name));
      if (sigunguMatch) {
        result.sigungu = sigunguMatch.name;
      }
    }
  }

  // 읍/면/동 추출 (시/군/구가 있는 경우)
  if (result.sido && result.sigungu) {
    const sidoCode = sidoMatch!.code;
    const sigunguList = SIGUNGU_DATA[sidoCode];
    const sigunguMatch = sigunguList?.find(sg => sg.name === result.sigungu);
    
    if (sigunguMatch) {
      const dongKey = sidoCode + sigunguMatch.code;
      const dongList = DONG_DATA[dongKey];
      if (dongList) {
        const dongMatch = dongList.find(dong => address.includes(dong));
        if (dongMatch) {
          result.eupmyeondong = dongMatch;
        }
      }
    }
  }

  return result;
}

/**
 * 주소 정합성 검증
 */
export function validateAddress(address: string): AddressValidationResult {
  if (!address || address.trim().length < 2) {
    return {
      isValid: false,
      level: 'invalid',
      message: '주소를 입력해주세요.'
    };
  }

  const parsedAddress = parseAddress(address);
  
  // 시/도 검증
  if (!parsedAddress.sido) {
    return {
      isValid: false,
      level: 'invalid',
      message: '올바른 시/도를 입력해주세요.',
      suggestions: SIDO_LIST.map(sido => sido.name)
    };
  }

  // 시/군/구 검증
  if (!parsedAddress.sigungu) {
    const sidoCode = SIDO_LIST.find(sido => sido.name === parsedAddress.sido)?.code;
    const suggestions = sidoCode ? SIGUNGU_DATA[sidoCode]?.map(sg => sg.name) : [];
    
    return {
      isValid: false,
      level: 'sido',
      message: `${parsedAddress.sido}의 시/군/구를 정확히 입력해주세요.`,
      suggestions
    };
  }

  // 읍/면/동 검증
  if (!parsedAddress.eupmyeondong) {
    return {
      isValid: false,
      level: 'sigungu',
      message: `${parsedAddress.sido} ${parsedAddress.sigungu}의 읍/면/동을 정확히 입력해주세요.`,
      suggestions: ['동 단위까지 입력해주세요.']
    };
  }

  // 모든 검증 통과
  return {
    isValid: true,
    level: 'complete',
    message: '주소가 정상적으로 확인되었습니다.',
    normalizedAddress: parsedAddress as KoreanAddress
  };
}

/**
 * 주소 자동완성 제안
 */
export function getAddressSuggestions(partialAddress: string, level: 'sido' | 'sigungu' | 'dong'): string[] {
  const query = partialAddress.toLowerCase();
  
  switch (level) {
    case 'sido':
      return SIDO_LIST
        .filter(sido => sido.name.toLowerCase().includes(query))
        .map(sido => sido.name)
        .slice(0, 10);
        
    case 'sigungu':
      const parsedAddress = parseAddress(partialAddress);
      if (!parsedAddress.sido) return [];
      
      const sidoCode = SIDO_LIST.find(sido => sido.name === parsedAddress.sido)?.code;
      if (!sidoCode || !SIGUNGU_DATA[sidoCode]) return [];
      
      return SIGUNGU_DATA[sidoCode]
        .filter(sg => sg.name.toLowerCase().includes(query))
        .map(sg => `${parsedAddress.sido} ${sg.name}`)
        .slice(0, 10);
        
    case 'dong':
      // 동 레벨 자동완성 로직
      return [];
        
    default:
      return [];
  }
}

/**
 * 실시간 주소 검증 (디바운스 적용 권장)
 */
export async function validateAddressAsync(address: string): Promise<AddressValidationResult> {
  // 실제 환경에서는 주소 API 호출
  // 예: 도로명주소 API, 카카오 주소 API 등
  
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(validateAddress(address));
    }, 300); // 300ms 지연으로 API 호출 시뮬레이션
  });
}

/**
 * 주소 정규화 (표준 형식으로 변환)
 */
export function normalizeAddress(address: KoreanAddress): string {
  const parts = [
    address.sido,
    address.sigungu, 
    address.eupmyeondong,
    address.roadName,
    address.buildingNumber,
    address.detailAddress
  ].filter(Boolean);
  
  return parts.join(' ');
}

/**
 * 주소 마스킹 (개인정보 보호)
 */
export function maskAddress(address: string): string {
  const parsedAddress = parseAddress(address);
  if (parsedAddress.sido && parsedAddress.sigungu) {
    return `${parsedAddress.sido} ${parsedAddress.sigungu} ***`;
  }
  return '*** *** ***';
}
