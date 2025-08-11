'use client';

export interface CurriculumSession {
  time: string;
  topic: string;
  description: string;
  tools?: string[];
}

export interface CurriculumLevel {
  id: string;
  level: '기초' | '심화' | '경영진';
  duration: string;
  objectives: string[];
  targetAudience: string;
  sessions: CurriculumSession[];
  outcomes: string[];
}

export interface IndustryCurriculum {
  industry: string;
  industryKey: string;
  description: string;
  levels: CurriculumLevel[];
}

export interface CurriculumData {
  [key: string]: IndustryCurriculum;
}
