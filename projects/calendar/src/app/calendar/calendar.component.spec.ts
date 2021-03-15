import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarComponent } from './calendar.component';
import { CalendarDayComponent } from './components/calendar-day/calendar-day.component';
import { ReminderModalComponent } from './components/reminder-modal/reminder-modal.component';
import { CalendarService } from './services/calendar.service';
import { SharedModule } from '../shared/shared.module';
import { Reminder } from '../shared/types/reminder';
import { of } from 'rxjs';

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
      declarations: [CalendarComponent, CalendarDayComponent, ReminderModalComponent],
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
    component.generateTestCalendar();
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
    spyOn(component, 'onCreateReminder').and.callFake(() => { });
    component.onSelectDay(day);
    expect(component.onCreateReminder).toHaveBeenCalledOnceWith(day)
  });

  it('should open edit Reminder Modal', () => {
    spyOn(component.dialog, 'open').and.callThrough();
    component.onEditReminder({ reminder: {}, event: { stopPropagation: () => { } } });
    expect(component.dialog.open).toHaveBeenCalledOnceWith(ReminderModalComponent, {
      maxWidth: "550px",
      data: {
        reminder: {},
        edit: true
      }
    })
  });

  it('should open add Reminder Modal', () => {
    component.selectedDay = component.calendar[2];
    spyOn(component.dialog, 'open').and.callThrough();
    component.onCreateReminder(component.selectedDay);
    expect(component.dialog.open).toHaveBeenCalledOnceWith(ReminderModalComponent, {
      maxWidth: "550px",
      data: {
        day: component.selectedDay,
        edit: false
      }
    })
  });

  // it('should call onCreateReminder and create reminder', () => {
  //   const reminder: Reminder = {
  //     city: 'Indaial',
  //     color: '#2478D4',
  //     dateTime: new Date(),
  //     date: new Date().toLocaleString(),
  //     forecast: '02d',
  //     id: new Date().toLocaleDateString(),
  //     title: 'Party!'
  //   };
  //   spyOn(component, 'openReminderModal').and.returnValue(of(reminder))
  //   component.onCreateReminder(component.calendar[5]);
  //   const reminders: any = component.calendar[5].reminders;
  //   expect(reminders[0]).toEqual(reminder);
  // })

  it('should call onCreateReminder null reminder', () => {
    spyOn(component, 'openReminderModal').and.returnValue(of(null))
    component.onCreateReminder(component.calendar[5]);
    expect(component.calendar[5].reminders?.length).toBe(0);
  })

  it('should deleteAllReminders', () => {
    spyOn(component, 'openConfirmationModal').and.returnValue(of(true))
    component.deleteAllReminders();
    expect(component.calendar[8].reminders?.length).toBe(0);
  })

  it('should deleteReminder', () => {
    spyOn(component, 'openConfirmationModal').and.returnValue(of(true))
    const reminders: any = component.calendar[8].reminders;
    component.deleteReminder(reminders[0], { stopPropagation: () => { } });
    expect(component.calendar[8].reminders?.length).toBe(4);
  })
});
