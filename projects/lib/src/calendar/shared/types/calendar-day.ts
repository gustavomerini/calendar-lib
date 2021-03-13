import { Event } from './event';

export interface CalendarDay {
  id: string;
  date: Date;
  isToday?: boolean;
  isOtherMonth?: boolean;
  events?: Event[];
}