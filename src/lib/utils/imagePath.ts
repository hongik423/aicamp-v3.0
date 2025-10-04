/**
 * 이미지 경로 유틸리티 함수
 */

export function getImagePath(imageName: string): string {
  // 기본 이미지 경로 처리
  if (!imageName) {
    return '/images/placeholder.jpg';
  }
  
  // 이미지 경로가 이미 완전한 URL인 경우
  if (imageName.startsWith('http') || imageName.startsWith('/')) {
    return imageName;
  }
  
  // 상대 경로를 절대 경로로 변환
  return `/images/${imageName}`;
}

export function getPlaceholderImage(width: number = 400, height: number = 300): string {
  return `https://picsum.photos/${width}/${height}`;
}
