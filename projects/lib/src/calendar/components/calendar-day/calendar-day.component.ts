import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CalendarDay } from '../../shared/types/calendar-day';

@Component({
  selector: 'app-calendar-day',
  templateUrl: './calendar-day.component.html',
  styleUrls: ['./calendar-day.component.scss']
})
export class CalendarDayComponent implements OnInit {
  @Input() day: CalendarDay = { id: '', date: new Date()};
  @Output() onSelectDay = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

}
