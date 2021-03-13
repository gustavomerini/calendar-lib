import { NgModule } from '@angular/core';
import { CalendarComponent } from './calendar.component';
import { CalendarDayComponent } from './components/calendar-day/calendar-day.component';
import { CalendarService } from './services/calendar.service';

@NgModule({
  declarations: [CalendarComponent, CalendarDayComponent],
  providers: [CalendarService],
  imports: [],
  exports: [CalendarComponent]
})
export class CalendarModule { }
