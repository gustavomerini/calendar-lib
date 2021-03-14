import { TestBed } from '@angular/core/testing';
import { CalendarDay } from '../../shared/types/calendar-day';
import { daysOfWeek } from '../../shared/utils';

import { CalendarService } from './calendar.service';

const calculateExpectedDates = (startDate: Date, expectedIndex: number, isOtherMonth: boolean = true)  => {
  let expectedDates: CalendarDay[] = [];
  for (let index = 0; index < expectedIndex; index++) {
    const day: CalendarDay = {
      id: startDate.toLocaleDateString(),
      date: new Date(startDate),
      isToday: startDate.toLocaleDateString() === new Date().toLocaleDateString(),
      isWeekend: daysOfWeek[startDate.getDay()] === 'Saturday' || daysOfWeek[startDate.getDay()] === 'Sunday',
      isOtherMonth,
      reminders: []
    }
    expectedDates = [...expectedDates, day];
    startDate.setDate(startDate.getDate() +1);
  }
  return expectedDates;
}

describe('CalendarService', () => {
  let service: CalendarService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CalendarService,
      ],
    });
    service = TestBed.inject(CalendarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should getLastMonthDays - Feb - 2020', () => {
    const date = new Date(2020, 1, 1);
    const startDate = new Date(2020, 0, 26);
    const expectedDates = calculateExpectedDates(startDate, 6);
    const days: CalendarDay[] = (service as any).getLastMonthDays(date);
    expect(days).toEqual(expectedDates);
  });

  it('should getLastMonthDays - Mar - 2020', () => {
    const date = new Date(2020, 2, 1);
    const expectedDates: any[] = [];
    const days: CalendarDay[] = (service as any).getLastMonthDays(date);
    expect(days.length).toBe(0);
    expect(days).toEqual(expectedDates);
  });

  it('should getLastMonthDays - December - 2021', () => {
    const date = new Date(2021, 11, 1);
    const startDate = new Date(2021, 10, 28);
    const expectedDates = calculateExpectedDates(startDate, 3);
    const days: CalendarDay[] = (service as any).getLastMonthDays(date);
    expect(days).toEqual(expectedDates);
  });

  it('should getLastMonthDays - January - 2021', () => {
    const date = new Date(2021, 0, 1);
    const startDate = new Date(2020, 11, 27);
    const expectedDates = calculateExpectedDates(startDate, 5);
    const days: CalendarDay[] = (service as any).getLastMonthDays(date);
    expect(days).toEqual(expectedDates);
  });

  it('should getLastMonthDays - Feb - 2021', () => {
    const date = new Date(2021, 1, 1);
    const startDate = new Date(2021, 0, 31);
    const expectedDates = calculateExpectedDates(startDate, 1);
    const days: CalendarDay[] = (service as any).getLastMonthDays(date);
    expect(days).toEqual(expectedDates);
  });

  it('should getLastMonthDays - April - 2021', () => {
    const date = new Date(2021, 3, 1);
    const startDate = new Date(2021, 2, 28);
    const expectedDates = calculateExpectedDates(startDate, 4);
    const days: CalendarDay[] = (service as any).getLastMonthDays(date);
    expect(days).toEqual(expectedDates);
  });

  it('should getLastMonthDays - May - 2021', () => {
    const date = new Date(2021, 4, 1);
    const startDate = new Date(2021, 3, 25);
    const expectedDates = calculateExpectedDates(startDate, 6);
    const days: CalendarDay[] = (service as any).getLastMonthDays(date);
    expect(days).toEqual(expectedDates);
  });

  it('should getLastMonthDays - June - 2021', () => {
    const date = new Date(2021, 5, 1);
    const startDate = new Date(2021, 4, 30);
    const expectedDates = calculateExpectedDates(startDate, 2);
    const days: CalendarDay[] = (service as any).getLastMonthDays(date);
    expect(days).toEqual(expectedDates);
  });

  it('should getLastMonthDays - November - 2045', () => {
    const date = new Date(2045, 10, 1);
    const startDate = new Date(2045, 9, 29);
    const expectedDates = calculateExpectedDates(startDate, 3);
    const days: CalendarDay[] = (service as any).getLastMonthDays(date);
    expect(days).toEqual(expectedDates);
  });

  it('should getLastMonthDays - November - 2066', () => {
    const date = new Date(2066, 10, 1);
    const startDate = new Date(2066, 9, 31);
    const expectedDates = calculateExpectedDates(startDate, 1);
    const days: CalendarDay[] = (service as any).getLastMonthDays(date);
    expect(days).toEqual(expectedDates);
  });

  it('should getNextMonthDays - Feb - 2020', () => {
    const date = new Date(2020, 1, 1);
    const expectedDates: any = [];
    const days: Date[] = (service as any).getNextMonthDays(date);
    expect(days).toEqual(expectedDates);
  });

  it('should getNextMonthDays - Mar - 2020', () => {
    const date = new Date(2020, 2, 1);
    const startDate = new Date(2020, 3, 1);
    const expectedDates = calculateExpectedDates(startDate, 4);
    const days: CalendarDay[] = (service as any).getNextMonthDays(date);
    expect(days).toEqual(expectedDates);
  });

  it('should getNextMonthDays - December - 2021', () => {
    const date = new Date(2021, 11, 1);
    const startDate = new Date(2022, 0, 1);
    const expectedDates = calculateExpectedDates(startDate, 1);
    const days: CalendarDay[] = (service as any).getNextMonthDays(date);
    expect(days).toEqual(expectedDates);
  });

  it('should getNextMonthDays - January - 2021', () => {
    const date = new Date(2021, 0, 1);
    const startDate = new Date(2021, 1, 1);
    const expectedDates = calculateExpectedDates(startDate, 6);
    const days: CalendarDay[] = (service as any).getNextMonthDays(date);
    expect(days).toEqual(expectedDates);
  });

  it('should getNextMonthDays - Feb - 2021', () => {
    const date = new Date(2021, 1, 1);
    const startDate = new Date(2021, 2, 1);
    const expectedDates = calculateExpectedDates(startDate, 6);
    const days: CalendarDay[] = (service as any).getNextMonthDays(date);
    expect(days).toEqual(expectedDates);
  });

  it('should getNextMonthDays - April - 2021', () => {
    const date = new Date(2021, 3, 1);
    const startDate = new Date(2021, 4, 1);
    const expectedDates = calculateExpectedDates(startDate, 1);
    const days: CalendarDay[] = (service as any).getNextMonthDays(date);
    expect(days).toEqual(expectedDates);
  });

  it('should getNextMonthDays - May - 2021', () => {
    const date = new Date(2021, 4, 1);
    const startDate = new Date(2021, 5, 1);
    const expectedDates = calculateExpectedDates(startDate, 5);
    const days: CalendarDay[] = (service as any).getNextMonthDays(date);
    expect(days).toEqual(expectedDates);
  });  

  it('should getNextMonthDays - June - 2021', () => {
    const date = new Date(2021, 5, 1);
    const startDate = new Date(2021, 6, 1);
    const expectedDates = calculateExpectedDates(startDate, 3);
    const days: CalendarDay[] = (service as any).getNextMonthDays(date);
    expect(days).toEqual(expectedDates);
  });

  it('should getNextMonthDays - November - 2045', () => {
    const date = new Date(2045, 10, 1);
    const startDate = new Date(2045, 11, 1);
    const expectedDates = calculateExpectedDates(startDate, 2);
    const days: CalendarDay[] = (service as any).getNextMonthDays(date);
    expect(days).toEqual(expectedDates);
  });

  it('should getNextMonthDays - November - 2066', () => {
    const date = new Date(2066, 10, 1);
    const startDate = new Date(2066, 11, 1);
    const expectedDates = calculateExpectedDates(startDate, 4);
    const days: CalendarDay[] = (service as any).getNextMonthDays(date);
    expect(days).toEqual(expectedDates);
  });

  it('should getCurrentMonthDays - April - 2021', () => {
    const date = new Date(2021, 3, 1);
    const startDate = new Date(2021, 3, 1);
    const expectedDates = calculateExpectedDates(startDate, 30, false);
    const days: CalendarDay[] = (service as any).getCurrentMonthDays(date);
    expect(days).toEqual(expectedDates);
  });

  it('should getCurrentMonthDays - July - 2021', () => {
    const date = new Date(2021, 6, 1);
    const startDate = new Date(2021, 6, 1);
    const expectedDates = calculateExpectedDates(startDate, 31, false);
    const days: CalendarDay[] = (service as any).getCurrentMonthDays(date);
    expect(days).toEqual(expectedDates);
  });

  it('should getCurrentMonthDays - November - 2045', () => {
    const date = new Date(2045, 10, 1);
    const startDate = new Date(2045, 10, 1);
    const expectedDates = calculateExpectedDates(startDate, 30, false);
    const days: CalendarDay[] = (service as any).getCurrentMonthDays(date);
    expect(days).toEqual(expectedDates);
  });

  it('should getCurrentMonthDays - Feb - 2020', () => {
    const date = new Date(2020, 1, 1);
    const startDate = new Date(2020, 1, 1);
    const expectedDates = calculateExpectedDates(startDate, 29, false);
    const days: CalendarDay[] = (service as any).getCurrentMonthDays(date);
    expect(days).toEqual(expectedDates);
  });

  // it('should getCurrentMonthDays - Feb - 2021', () => {
  //   const date = new Date(2021, 1, 1);
  //   const startDate = new Date(2021, 1, 1);
  //   const expectedDates = calculateExpectedDates(startDate, 28, true);
  //   const days: CalendarDay[] = (service as any).getCurrentMonthDays(date);
  //   expect(days).toEqual(expectedDates);
  // });

  // it('should generateCalendarByMonth - Feb - 2021', () => {
  //   const date = new Date(2021, 1, 1);
  //   const startDate = new Date(2021, 0, 31);
  //   const expectedDates = calculateExpectedDates(startDate, 35);
  //   const days: CalendarDay[] = (service as any).generateCalendarByMonth(date.getMonth());
  //   expect(days).toEqual(expectedDates);
  // });

  // it('should generateCalendarByMonth - May - 2021', () => {
  //   const date = new Date(2021, 4, 1);
  //   const startDate = new Date(2021, 3, 25);
  //   const expectedDates = calculateExpectedDates(startDate, 42);
  //   const days: CalendarDay[] = (service as any).generateCalendarByMonth(date.getMonth());
  //   expect(days).toEqual(expectedDates);
  // });

  // it('should generateCalendarByMonth - Feb - 2020', () => {
  //   const date = new Date(2020, 1, 1);
  //   const expectedDateStart = new Date(2020, 0, 26);
  //   let expectedDates: Date[] = [];
  //   for (let index = 0; index < 35; index++) {
  //     expectedDates = [...expectedDates, new Date(expectedDateStart)];
  //     expectedDateStart.setDate(expectedDateStart.getDate() + 1);
  //   }
  //   const days: Date[] = (service as any).generateCalendarByMonth(date.getMonth(), date.getFullYear());
  //   expect(days).toEqual(expectedDates);
  // });
});
