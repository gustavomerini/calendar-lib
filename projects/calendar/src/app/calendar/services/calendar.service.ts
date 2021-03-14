import { Injectable } from '@angular/core';
import { CalendarDay } from '../../shared/types/calendar-day';
import { daysOfWeek } from '../../shared/utils';

@Injectable()
export class CalendarService {

  constructor() { }

  public getCalendar(date: Date): any {
    return this.generateCalendarByMonth(date.getMonth(), date.getFullYear());
  }

  private generateCalendarByMonth(month: number, year: number = 2021): CalendarDay[] {
    const date = new Date(year, month, 1);
    const lastMonthDays = this.getLastMonthDays(date);
    const thisMonthDays = this.getCurrentMonthDays(date);
    const nextMonthDays = this.getNextMonthDays(date);
    return [...lastMonthDays, ...thisMonthDays, ...nextMonthDays];
  }

  private getDays(startDate: Date, startIndex: number, endIndex: number, isOtherMonth: boolean = true) {
    let days: CalendarDay[] = [];
    for (let index = startIndex; index < endIndex; index++) {
      const day = {
        id: startDate.toLocaleDateString(),
        date: new Date(startDate),
        isToday: startDate.toLocaleDateString() === new Date().toLocaleDateString(),
        isWeekend: daysOfWeek[startDate.getDay()] === 'Saturday' || daysOfWeek[startDate.getDay()] === 'Sunday',
        isOtherMonth,
        reminders: []
      }
      days = [...days, day];
      startDate.setDate(startDate.getDate() + 1);
    }
    return days;
  }

  private getCurrentMonthDays(date: Date) {
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    const lastDayNumber = lastDay.getDate();
    let days: CalendarDay[] = this.getDays(firstDay, 0, lastDayNumber, false);
    return days;
  }

  private getLastMonthDays(date: Date) {
    const lastMonth = new Date(date);
    const dayOfWeek = date.getDay();
    lastMonth.setDate(0);
    lastMonth.setDate(lastMonth.getDate() - dayOfWeek + 1);
    let days: CalendarDay[] = this.getDays(lastMonth, 0, dayOfWeek);
    return days;
  }

  private getNextMonthDays(date: Date) {
    const nextMonth = new Date(date);
    const lastDayOfWeek = 6; // Saturday
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDay();
    if (lastDay === lastDayOfWeek) {
      return [];
    }
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    const dayOfWeek = nextMonth.getDay();
    let days: CalendarDay[] = this.getDays(nextMonth, dayOfWeek, lastDayOfWeek + 1);
    return days;
  }

}

