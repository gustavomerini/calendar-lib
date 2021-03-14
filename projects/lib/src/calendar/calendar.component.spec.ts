import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarComponent } from './calendar.component';
import { CalendarDayComponent } from './components/calendar-day/calendar-day.component';
import { ReminderModalComponent } from './components/reminder-modal/reminder-modal.component';
import { ReminderComponent } from './components/reminder/reminder.component';
import { CalendarService } from './services/calendar.service';
import { SharedModule } from './shared/shared.module';

describe('CalendarComponent', () => {
  let component: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;
  const mockDialogRef = {
    open: jasmine.createSpy('open'),
    close: jasmine.createSpy('close')
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SharedModule,
        NoopAnimationsModule,
      ],
      declarations: [CalendarComponent, CalendarDayComponent, ReminderComponent, ReminderModalComponent],
      providers: [
        CalendarService,
        FormBuilder,
        MatDialog,
        { provide: MatDialogRef, useValue: mockDialogRef }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should select Day', () => {
    const day = component.calendar[2];
    component.onSelectDay(day);
    expect(component.selectedDay).toBeTruthy(day);
    expect(day.isActive).toBeTrue();
  });

  it('should open add Reminder if selected Day clicked twice', () => {
    const day = component.calendar[2];
    component.onSelectDay(day);
    expect(component.selectedDay).toBeTruthy(day);
    expect(day.isActive).toBeTrue();
    spyOn(component, 'onCreateReminder').and.callFake(() => {});
    component.onSelectDay(day);
    expect(component.onCreateReminder).toHaveBeenCalledOnceWith(day)
  });

  it('should open add Reminder Modal', () => {
    component.selectedDay = component.calendar[2];
    spyOn(component.dialog, 'open').and.callThrough();
    component.onCreateReminder(component.selectedDay);
    expect(component.dialog.open).toHaveBeenCalledOnceWith(ReminderModalComponent, {
      maxWidth: "400px",
      data: {
        day: component.selectedDay
      }
    })
  });  
});
