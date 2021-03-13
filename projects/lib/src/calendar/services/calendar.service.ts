import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { last } from 'rxjs/operators';

@Injectable()
export class CalendarService {

  constructor() { }

  public getCalendar(): any {
    return this.generateCalendarByMonth(8);
  }

  private generateCalendarByMonth(month: number, year: number = 2021): Date[] {
    const date = new Date(year, month, 1);
    const lastMonthDays = this.getLastMonthDays(date);
    const thisMonthDays = this.getCurrentMonthDays(date);
    const nextMonthDays = this.getNextMonthDays(date);
    return [...lastMonthDays, ...thisMonthDays, ...nextMonthDays];
  }

  private getCurrentMonthDays(date: Date) {
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDay = new Date(date.getFullYear(), date.getMonth() +1, 0);
    const lastDayNumber = lastDay.getDate();
    let days: Date[] = [];
    for (let index = 0; index < lastDayNumber; index++) {
      days = [...days, new Date(firstDay)];
      firstDay.setDate(firstDay.getDate() +1);
    }
    return days;
  }

  private getLastMonthDays(date: Date) {
    const lastMonth = new Date(date);
    const dayOfWeek = date.getDay();
    lastMonth.setDate(0);
    let days: Date[] = [];
    for (let index = 0; index < dayOfWeek; index++) {
      days = [...days, new Date(lastMonth)];
      lastMonth.setDate(lastMonth.getDate() - 1);
    }
    return days.sort((a, b) => this.sortDateAsc(a, b));
  }

  private sortDateAsc(date1: any, date2: any) {
    return date1 - date2;
  }

  private getNextMonthDays(date: Date) {
    const nextMonth = new Date(date);
    const lastDayOfWeek = 6; // Saturday
    const lastDay = new Date(date.getFullYear(), date.getMonth() +1, 0).getDay();
    if (lastDay === lastDayOfWeek) {
      return [];
    }
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    const dayOfWeek = nextMonth.getDay();
    let days: Date[] = [];
    for (let index = dayOfWeek; index <= lastDayOfWeek; index++) {
      days = [...days, new Date(nextMonth)];
      nextMonth.setDate(nextMonth.getDate() + 1);
    }
    return days;
  }

}

