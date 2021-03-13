import { Component, Input, OnInit } from '@angular/core';
import { CalendarDay } from '../../shared/types/calendar-day';

@Component({
  selector: 'app-calendar-day',
  templateUrl: './calendar-day.component.html',
  styleUrls: ['./calendar-day.component.scss']
})
export class CalendarDayComponent implements OnInit {
  @Input() day: CalendarDay = { id: '', date: new Date()};

  constructor() { }

  ngOnInit(): void {
  }

}
