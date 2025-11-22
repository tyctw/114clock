import { ExamEvent } from './types';

// ROC Year 115 = 2026 AD
const YEAR_AD = 2026;

export const EXAM_EVENTS: ExamEvent[] = [
  {
    id: 'registration',
    title: '國中會考報名',
    startDate: new Date(YEAR_AD, 2, 5), // Month is 0-indexed: March is 2
    endDate: new Date(YEAR_AD, 2, 7),
    note: '115/03/05 ~ 115/03/07'
  },
  {
    id: 'admit_card',
    title: '國中會考寄發准考證',
    startDate: new Date(YEAR_AD, 3, 10), // April is 3
    note: '115/04/10'
  },
  {
    id: 'exam_day',
    title: '國中會考日期',
    startDate: new Date(YEAR_AD, 4, 16), // May is 4
    endDate: new Date(YEAR_AD, 4, 17),
    note: '115/05/16 ~ 115/05/17',
    isMainExam: true
  },
  {
    id: 'score_release',
    title: '國中會考成績公布',
    startDate: new Date(YEAR_AD, 5, 5), // June is 5
    note: '115/06/05'
  },
  {
    id: 'rank_release',
    title: '個人序位區間公告',
    startDate: new Date(YEAR_AD, 5, 18), // June 18
    note: '115/06/18'
  },
  {
    id: 'volunteer_start',
    title: '就學區免試入學填志願',
    startDate: new Date(YEAR_AD, 5, 18), // June 18
    note: '115/06/18（開始）'
  },
  {
    id: 'placement_result',
    title: '就學區免試入學放榜',
    startDate: new Date(YEAR_AD, 6, 7), // July 7
    note: '115/07/07（放榜依各地區時間為主）'
  },
  {
    id: 'reporting',
    title: '免試入學報到',
    startDate: new Date(YEAR_AD, 6, 9), // July 9
    note: '115/07/09'
  }
];

export const QUOTES_PROMPT = `
Generate a short, inspiring, and energetic motivational quote or study tip for a Taiwanese junior high school student preparing for the "Comprehensive Assessment Program" (國中會考). 
Keep it under 40 words. Language: Traditional Chinese (Taiwan).
Tone: Encouraging, focused, slightly strict but warm (like a mentor).
`;