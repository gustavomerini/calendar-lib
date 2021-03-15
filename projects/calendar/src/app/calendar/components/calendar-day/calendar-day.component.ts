import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CalendarDay } from '../../../shared/types/calendar-day';

@Component({
  selector: 'app-calendar-day',
  templateUrl: './calendar-day.component.html',
  styleUrls: ['./calendar-day.component.scss']
})
export class CalendarDayComponent implements OnInit {
  @Input() day: CalendarDay | any = { id: '', date: new Date(), reminders: []};
  @Input() isBigCalendar = false;
  @Output() onSelectDay = new EventEmitter();
  @Output() onEditReminder = new EventEmitter();
  public sliceNumber = 4;

  constructor() { }

  ngOnInit(): void {
    this.sliceNumber = this.isBigCalendar ? 3 : 4;
  }

}
