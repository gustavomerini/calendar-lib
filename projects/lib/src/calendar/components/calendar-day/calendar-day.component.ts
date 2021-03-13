import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendar-day',
  templateUrl: './calendar-day.component.html',
  styleUrls: ['./calendar-day.component.scss']
})
export class CalendarDayComponent implements OnInit {
  @Input() day: Date = new Date();

  constructor() { }

  ngOnInit(): void {
  }

}