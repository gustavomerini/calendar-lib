
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarComponent } from './calendar.component';
import { CalendarDayComponent } from './components/calendar-day/calendar-day.component';
import { CalendarService } from './services/calendar.service';
import { SharedModule } from '../shared/shared.module';
import { ReminderModalComponent } from './components/reminder-modal/reminder-modal.component';
import { BrowserModule } from '@angular/platform-browser';
import { ForecastService } from './services/forecast.service';

@NgModule({
  declarations: [CalendarComponent, CalendarDayComponent, ReminderModalComponent],
  providers: [
    CalendarService,
    ForecastService
  ],
  imports: [BrowserModule, BrowserAnimationsModule, SharedModule],
  exports: [CalendarComponent]
})
export class CalendarModule { }
