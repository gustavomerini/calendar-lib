import { Component, OnInit } from '@angular/core';
import { CalendarDay } from './shared/types/calendar-day';
import { CalendarService } from './services/calendar.service';

@Component({
  selector: 'calendar-lib',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  public calendar: CalendarDay[] = [];
  public today: Date = new Date;
  public month: string = '';
  public daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  private monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  constructor(private calendarService: CalendarService) { }

  ngOnInit(): void {
    this.calendar = this.calendarService.getCalendar(this.today);
    this.month = this.monthNames[this.calendar[10].date.getMonth()];
  }

}
