export interface CalendarDay {
  id: string;
  date: Date;
  isWeekend?: boolean;
  isToday?: boolean;
  isOtherMonth?: boolean;
}