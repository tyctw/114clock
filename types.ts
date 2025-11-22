export enum EventStatus {
  UPCOMING = 'UPCOMING',
  ACTIVE = 'ACTIVE', // For multi-day events currently happening
  PASSED = 'PASSED'
}

export interface ExamEvent {
  id: string;
  title: string;
  startDate: Date;
  endDate?: Date; // Optional end date for ranges
  note?: string;
  isMainExam?: boolean; // Flag for the main CAP exam
}

export interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalSeconds: number;
}