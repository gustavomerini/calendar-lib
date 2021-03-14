import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';

import { CalendarComponent } from './calendar.component';
import { CalendarDayComponent } from './components/calendar-day/calendar-day.component';
import { ReminderComponent } from './components/reminder/reminder.component';
import { CalendarService } from './services/calendar.service';
import { SharedModule } from './shared/shared.module';
import { ReminderModalComponent } from './components/reminder-modal/reminder-modal.component';

@NgModule({
  declarations: [CalendarComponent, CalendarDayComponent, ReminderComponent, ReminderModalComponent],
  providers: [
    CalendarService,
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },
  ],
  imports: [CommonModule, BrowserAnimationsModule, SharedModule, ReactiveFormsModule],
  exports: [CalendarComponent]
})
export class CalendarModule { }
