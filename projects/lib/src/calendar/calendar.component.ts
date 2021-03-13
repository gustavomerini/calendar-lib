import { Component, OnInit } from '@angular/core';
import { CalendarDay } from './shared/types/calendar-day';
import { CalendarService } from './services/calendar.service';
import { daysOfWeek, monthNames } from './shared/utils';

@Component({
  selector: 'calendar-lib',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  public calendar: CalendarDay[] = [];
  public today: Date = new Date();
  public month: string = '';
  public daysOfWeek = daysOfWeek;
  private monthNames = monthNames;

  constructor(private calendarService: CalendarService) { }

  ngOnInit(): void {
    this.calendar = this.calendarService.getCalendar(this.today);
    this.month = this.monthNames[this.calendar[10].date.getMonth()];
  }

}
