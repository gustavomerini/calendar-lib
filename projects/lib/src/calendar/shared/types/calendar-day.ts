import { Event } from './event';

export interface CalendarDay {
  id: string;
  date: Date;
  isWeekend?: boolean;
  isToday?: boolean;
  isOtherMonth?: boolean;
  events?: Event[];
}