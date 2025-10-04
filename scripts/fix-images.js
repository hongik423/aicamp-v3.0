const fs = require('fs');
const path = require('path');

// 이미지 교체 매핑
const imageReplacements = {
  // IT/기술 업종 (이미 교체됨)
  'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80': 'https://picsum.photos/1200/800?random=1',
  'https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80': 'https://picsum.photos/1200/800?random=2',
  'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80': 'https://picsum.photos/1200/800?random=3',
  'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80': 'https://picsum.photos/1200/800?random=4',
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80': 'https://picsum.photos/1200/800?random=5',
  'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80': 'https://picsum.photos/1200/800?random=6',
  'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80': 'https://picsum.photos/1200/800?random=7',
  'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80': 'https://picsum.photos/1200/800?random=8',
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80': 'https://picsum.photos/1200/800?random=9',
  'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80': 'https://picsum.photos/1200/800?random=10',
  
  // 제조업 업종 (이미 교체됨)
  'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80': 'https://picsum.photos/1200/800?random=11',
  'https://images.unsplash.com/photo-1485291571150-772bcfc10da5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80': 'https://picsum.photos/1200/800?random=12',
  'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80': 'https://picsum.photos/1200/800?random=13',
  'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80': 'https://picsum.photos/1200/800?random=14',
  'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80': 'https://picsum.photos/1200/800?random=15',
  'https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80': 'https://picsum.photos/1200/800?random=16',
  'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80': 'https://picsum.photos/1200/800?random=17',
  'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80': 'https://picsum.photos/1200/800?random=18',
  
  // 의료/헬스케어 업종
  'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=2070&auto=format&fit=crop': 'https://picsum.photos/1200/800?random=21',
  'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?q=80&w=2091&auto=format&fit=crop': 'https://picsum.photos/1200/800?random=22',
  'https://images.unsplash.com/photo-1587370560942-ad2a04eabb6d?q=80&w=2070&auto=format&fit=crop': 'https://picsum.photos/1200/800?random=23',
  'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=2074&auto=format&fit=crop': 'https://picsum.photos/1200/800?random=24',
  'https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=2080&auto=format&fit=crop': 'https://picsum.photos/1200/800?random=25',
  'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2070&auto=format&fit=crop': 'https://picsum.photos/1200/800?random=26',
  'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=2070&auto=format&fit=crop': 'https://picsum.photos/1200/800?random=27',
  
  // 교육/연구 업종
  'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop': 'https://picsum.photos/1200/800?random=31',
  'https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=2070&auto=format&fit=crop': 'https://picsum.photos/1200/800?random=32',
  'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop': 'https://picsum.photos/1200/800?random=33',
  'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=2071&auto=format&fit=crop': 'https://picsum.photos/1200/800?random=34',
  'https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=2070&auto=format&fit=crop': 'https://picsum.photos/1200/800?random=35',
  'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=2074&auto=format&fit=crop': 'https://picsum.photos/1200/800?random=36',
  'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop': 'https://picsum.photos/1200/800?random=37',
  
  // 건설/부동산 업종
  'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop': 'https://picsum.photos/1200/800?random=41',
  'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=2069&auto=format&fit=crop': 'https://picsum.photos/1200/800?random=42',
  'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2131&auto=format&fit=crop': 'https://picsum.photos/1200/800?random=43',
  'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?q=80&w=2070&auto=format&fit=crop': 'https://picsum.photos/1200/800?random=44',
  'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2073&auto=format&fit=crop': 'https://picsum.photos/1200/800?random=45',
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop': 'https://picsum.photos/1200/800?random=46',
  'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2076&auto=format&fit=crop': 'https://picsum.photos/1200/800?random=47',
  
  // 운송/물류 업종
  'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop': 'https://picsum.photos/1200/800?random=51',
  'https://images.unsplash.com/photo-1578662996442-48f60103fc9e?q=80&w=2070&auto=format&fit=crop': 'https://picsum.photos/1200/800?random=52',
  'https://images.unsplash.com/photo-1570710891163-6d3b5c47248b?q=80&w=2070&auto=format&fit=crop': 'https://picsum.photos/1200/800?random=53',
  'https://images.unsplash.com/photo-1519003300449-424ad0405076?q=80&w=2073&auto=format&fit=crop': 'https://picsum.photos/1200/800?random=54',
  'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?q=80&w=2070&auto=format&fit=crop': 'https://picsum.photos/1200/800?random=55',
  'https://images.unsplash.com/photo-1619734086067-24bf8889ea7d?q=80&w=2070&auto=format&fit=crop': 'https://picsum.photos/1200/800?random=56',
  'https://images.unsplash.com/photo-1553413077-190dd305871c?q=80&w=2070&auto=format&fit=crop': 'https://picsum.photos/1200/800?random=57',
  
  // 미디어/콘텐츠 업종
  'https://images.unsplash.com/photo-1598743400863-0201c7e1445b?q=80&w=2070&auto=format&fit=crop': 'https://picsum.photos/1200/800?random=61',
  'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=2074&auto=format&fit=crop': 'https://picsum.photos/1200/800?random=62',
  
  // 전문서비스 업종
  'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=2070&auto=format&fit=crop': 'https://picsum.photos/1200/800?random=71',
  'https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2072&auto=format&fit=crop': 'https://picsum.photos/1200/800?random=72',
  
  // 금융/보험 업종
  'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80': 'https://picsum.photos/1200/800?random=81',
  'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80': 'https://picsum.photos/1200/800?random=82',
  
  // 유통/서비스 업종
  'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80': 'https://picsum.photos/1200/800?random=91',
  'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80': 'https://picsum.photos/1200/800?random=92',
  'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80': 'https://picsum.photos/1200/800?random=93',
  'https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80': 'https://picsum.photos/1200/800?random=94',
  'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80': 'https://picsum.photos/1200/800?random=95',
  'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80': 'https://picsum.photos/1200/800?random=96',
  'https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80': 'https://picsum.photos/1200/800?random=97',
  'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80': 'https://picsum.photos/1200/800?random=98',
  
  // 기타 업종
  'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80': 'https://picsum.photos/1200/800?random=101',
  'https://images.unsplash.com/photo-1553484771-371a605b060b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80': 'https://picsum.photos/1200/800?random=102'
};

// 파일 목록
const files = [
  'src/data/success-cases/healthcare-medical-cases.ts',
  'src/data/success-cases/education-research-cases.ts',
  'src/data/success-cases/construction-realestate-cases.ts',
  'src/data/success-cases/logistics-transport-cases.ts',
  'src/data/success-cases/media-content-cases.ts',
  'src/data/success-cases/professional-service-cases.ts',
  'src/data/success-cases/finance-insurance-cases.ts',
  'src/data/success-cases/retail-service-cases.ts',
  'src/data/success-cases/ai-n8n-automation-cases.ts'
];

console.log('🔄 이미지 URL 교체 시작...');

files.forEach(filePath => {
  try {
    const fullPath = path.join(process.cwd(), filePath);
    if (fs.existsSync(fullPath)) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let replaced = false;
      
      Object.entries(imageReplacements).forEach(([oldUrl, newUrl]) => {
        if (content.includes(oldUrl)) {
          content = content.replace(new RegExp(oldUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), newUrl);
          replaced = true;
          console.log(`✅ ${filePath}: ${oldUrl.split('/').pop()} → ${newUrl.split('=').pop()}`);
        }
      });
      
      if (replaced) {
        fs.writeFileSync(fullPath, content, 'utf8');
      }
    }
  } catch (error) {
    console.error(`❌ ${filePath} 처리 중 오류:`, error.message);
  }
});

console.log('�� 이미지 URL 교체 완료!');
