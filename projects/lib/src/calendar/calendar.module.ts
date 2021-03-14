import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CalendarComponent } from './calendar.component';
import { CalendarDayComponent } from './components/calendar-day/calendar-day.component';
import { ReminderComponent } from './components/reminder/reminder.component';
import { CalendarService } from './services/calendar.service';

@NgModule({
  declarations: [CalendarComponent, CalendarDayComponent, ReminderComponent],
  providers: [CalendarService],
  imports: [CommonModule],
  exports: [CalendarComponent]
})
export class CalendarModule { }
