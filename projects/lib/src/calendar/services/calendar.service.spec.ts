import { TestBed } from '@angular/core/testing';

import { CalendarService } from './calendar.service';

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
    const expectedDates = [new Date(2020, 0, 31), new Date(2020, 0, 30), new Date(2020, 0, 29), new Date(2020, 0, 28), new Date(2020, 0, 27), new Date(2020, 0, 26)];
    const days: Date[] = (service as any).getLastMonthDays(date);
    expect(days).toEqual(expectedDates);
  });

  it('should getLastMonthDays - Mar - 2020', () => {
    const date = new Date(2020, 2, 1);
    const expectedDates: any[] = [];
    const days: Date[] = (service as any).getLastMonthDays(date);
    expect(days.length).toBe(0);
    expect(days).toEqual(expectedDates);
  });

  it('should getLastMonthDays - December - 2021', () => {
    const date = new Date(2021, 0, 1);
    const expectedDates = [new Date(2020, 11, 31), new Date(2020, 11, 30), new Date(2020, 11, 29), new Date(2020, 11, 28), new Date(2020, 11, 27)];
    const days: Date[] = (service as any).getLastMonthDays(date);
    expect(days).toEqual(expectedDates);
  });

  it('should getLastMonthDays - January - 2021', () => {
    const date = new Date(2021, 0, 1);
    const expectedDates = [new Date(2020, 11, 31), new Date(2020, 11, 30), new Date(2020, 11, 29), new Date(2020, 11, 28), new Date(2020, 11, 27)];
    const days: Date[] = (service as any).getLastMonthDays(date);
    expect(days).toEqual(expectedDates);
  });

  it('should getLastMonthDays - Feb - 2021', () => {
    const date = new Date(2021, 1, 1);
    const expectedDates = [new Date(2021, 0, 31)];
    const days: Date[] = (service as any).getLastMonthDays(date);
    expect(days).toEqual(expectedDates);
  });

  it('should getLastMonthDays - April - 2021', () => {
    const date = new Date(2021, 3, 1);
    const expectedDates = [new Date(2021, 2, 31), new Date(2021, 2, 30), new Date(2021, 2, 29), new Date(2021, 2, 28)];
    const days: Date[] = (service as any).getLastMonthDays(date);
    expect(days).toEqual(expectedDates);
  });

  it('should getLastMonthDays - June - 2021', () => {
    const date = new Date(2021, 5, 1);
    const expectedDates = [new Date(2021, 4, 31), new Date(2021, 4, 30)];
    const days: Date[] = (service as any).getLastMonthDays(date);
    expect(days).toEqual(expectedDates);
  });

  it('should getLastMonthDays - November - 2045', () => {
    const date = new Date(2045, 10, 1);
    const expectedDates = [new Date(2045, 9, 31), new Date(2045, 9, 30), new Date(2045, 9, 29)];
    const days: Date[] = (service as any).getLastMonthDays(date);
    expect(days).toEqual(expectedDates);
  });

  it('should getLastMonthDays - November - 2066', () => {
    const date = new Date(2066, 10, 1);
    const expectedDates = [new Date(2066, 9, 31)];
    const days: Date[] = (service as any).getLastMonthDays(date);
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
    const expectedDates: any[] = [new Date(2020, 3, 1), new Date(2020, 3, 2), new Date(2020, 3, 3), new Date(2020, 3, 4)];
    const days: Date[] = (service as any).getNextMonthDays(date);
    expect(days).toEqual(expectedDates);
  });

  it('should getNextMonthDays - December - 2021', () => {
    const date = new Date(2021, 11, 1);
    const expectedDates = [new Date(2022, 0, 1)];
    const days: Date[] = (service as any).getNextMonthDays(date);
    expect(days).toEqual(expectedDates);
  });

  it('should getNextMonthDays - January - 2021', () => {
    const date = new Date(2021, 0, 1);
    const expectedDates = [new Date(2021, 1, 1), new Date(2021, 1, 2), new Date(2021, 1, 3), new Date(2021, 1, 4), new Date(2021, 1, 5), new Date(2021, 1, 6)];
    const days: Date[] = (service as any).getNextMonthDays(date);
    expect(days).toEqual(expectedDates);
  });

  it('should getNextMonthDays - Feb - 2021', () => {
    const date = new Date(2021, 1, 1);
    const expectedDates = [new Date(2021, 2, 1), new Date(2021, 2, 2), new Date(2021, 2, 3), new Date(2021, 2, 4), new Date(2021, 2, 5), new Date(2021, 2, 6)];
    const days: Date[] = (service as any).getNextMonthDays(date);
    expect(days).toEqual(expectedDates);
  });

  it('should getNextMonthDays - April - 2021', () => {
    const date = new Date(2021, 3, 1);
    const expectedDates = [new Date(2021, 4, 1)];
    const days: Date[] = (service as any).getNextMonthDays(date);
    expect(days).toEqual(expectedDates);
  });

  it('should getNextMonthDays - June - 2021', () => {
    const date = new Date(2021, 5, 1);
    const expectedDates = [new Date(2021, 6, 1), new Date(2021, 6, 2), new Date(2021, 6, 3)];
    const days: Date[] = (service as any).getNextMonthDays(date);
    expect(days).toEqual(expectedDates);
  });

  it('should getNextMonthDays - November - 2045', () => {
    const date = new Date(2045, 10, 1);
    const expectedDates = [new Date(2045, 11, 1), new Date(2045, 11, 2)];
    const days: Date[] = (service as any).getNextMonthDays(date);
    expect(days).toEqual(expectedDates);
  });

  it('should getNextMonthDays - November - 2066', () => {
    const date = new Date(2066, 10, 1);
    const expectedDates = [new Date(2066, 11, 1), new Date(2066, 11, 2), new Date(2066, 11, 3), new Date(2066, 11, 4)];
    const days: Date[] = (service as any).getNextMonthDays(date);
    expect(days).toEqual(expectedDates);
  });
});
