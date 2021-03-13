import { Component, OnInit } from '@angular/core';
import { CalendarService } from './services/calendar.service';

@Component({
  selector: 'calendar-lib',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  public calendar: Date[] = [];
  public today: Date = new Date;
  public daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  
  constructor(private calendarService: CalendarService) { }

  ngOnInit(): void {
    this.calendar = this.calendarService.getCalendar(this.today);
  }

}
