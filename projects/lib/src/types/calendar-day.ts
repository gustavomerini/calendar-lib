import { Event } from './event';

export interface CalendarDay {
  id: string;
  fullDate: Date;
  date: string;
  notCurrentMonth: boolean;
  isToday: boolean;
  isWeekend: boolean;
  events: Event[];
}