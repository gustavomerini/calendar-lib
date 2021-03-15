import { Component, OnInit, SimpleChanges } from '@angular/core';
import { CalendarDay } from '../shared/types/calendar-day';
import { CalendarService } from './services/calendar.service';
import { daysOfWeek, monthNames, sortByDateAdc, testReminders } from '../shared/utils';
import { ReminderModalComponent } from './components/reminder-modal/reminder-modal.component';
import { ReminderService } from './services/reminder.sevice';
import { Reminder } from '../shared/types/reminder';
import { MatDialog } from '@angular/material/dialog';
import { MatDatepicker } from '@angular/material/datepicker';
import { ConfirmationDialogComponent } from '../shared/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'calendar-lib',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  public calendar: CalendarDay[] = [];
  public mapCalendar: any = {}
  public startDate: Date = new Date();
  public selectedDay: CalendarDay = { id: '', date: new Date(), reminders: [] };
  public month: string = '';
  public reminders: Reminder[] = [];
  public daysOfWeek = daysOfWeek;
  private monthNames = monthNames;
  constructor(private calendarService: CalendarService, private reminderService: ReminderService, public dialog: MatDialog) { }

  public ngOnInit(): void {
    this.calendar = this.calendarService.getCalendar(this.startDate);
    this.reminders = this.reminderService.reminders;
    this.month = this.monthNames[this.calendar[10].date.getMonth()];
    this.reminderService.remindersChange.subscribe((reminders) => {
      this.reminders = reminders;
    })
    this.generateTestCalendar();
    this.mapReminders();
  }

  public generateTestCalendar() {
    this.reminders = testReminders;
    this.reminderService.reminders = this.reminders;
  }

  public onSelectDay(day: CalendarDay) {
    if (day.id === this.selectedDay.id) {
      this.onCreateReminder(day);
      return;
    }
    this.selectedDay.isActive = false;
    this.selectedDay = day;
    day.isActive = true;
  }

  public onEditReminder(response: any) {
    response.event.stopPropagation();
    const reminder = response.reminder;
    this.openReminderModal(reminder, 'reminder', true).subscribe((newReminder: Reminder) => this.handleEditedReminder(reminder, newReminder));
  }

  public handleEditedReminder(oldReminder: Reminder, newReminder: Reminder) {
    if (!newReminder) return;
    if (newReminder.id !== oldReminder.id) {
      const day: any = this.mapCalendar.get(oldReminder.date);
      day.reminders = day.reminders.filter((d: any) => d.id !== oldReminder.id);
    }
    this.reminderService.editReminder(oldReminder, newReminder);
    this.mapEditReminder(newReminder);
  }

  public onCreateReminder(day: CalendarDay) {
    this.openReminderModal(day, 'day').subscribe((data) => this.handleCreatedReminder(data));
  }

  public handleCreatedReminder(reminder: Reminder) {
    if (reminder) {
      this.reminderService.addReminder(reminder);
      this.mapAddReminder(reminder);
    }
  }

  public openReminderModal(data: CalendarDay | Reminder, propName: string, edit: boolean = false) {
    const dialogRef = this.dialog.open(ReminderModalComponent, {
      maxWidth: "550px",
      data: {
        [propName]: data,
        edit
      }
    });

    return dialogRef.afterClosed();
  }

  public openConfirmationModal(title: string) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      maxWidth: "400px",
      data: {
        reminderTitle: title
      }
    });

    return dialogRef.afterClosed();
  }

  public deleteReminder(reminder: Reminder, event: any) {
    event.stopPropagation();
    this.openConfirmationModal(reminder.title).subscribe((dialogResult) => this.handleDeletedReminder(reminder, dialogResult));
  }

  private handleDeletedReminder(reminder: Reminder, dialogResult: boolean) {
    if (dialogResult) {
      this.mapDeleteReminder(reminder);
      this.reminderService.removeReminder(reminder.id);
    }
  }

  private handleAllDeletedReminder(dialogResult: boolean) {
    if (dialogResult) {
      this.mapDeleteReminders();
      this.reminderService.removeAllReminders();
    }
  }  

  public deleteAllReminders() {
    this.openConfirmationModal('all reminders').subscribe((dialogResult) => this.handleAllDeletedReminder(dialogResult));
  }

  public chosenMonthHandler(date: any, datepicker: MatDatepicker<Date>) {
    this.startDate = date;
    this.calendar = this.calendarService.getCalendar(this.startDate);
    this.mapReminders();
    datepicker.close();
  }

  private mapReminders() {
    this.mapCalendar = this.calendar.reduce((acc, item) => acc.set(item.id, item), new Map());
    this.reminders.forEach(reminder => {
      const day: any = this.mapCalendar.get(reminder.date);
      if (!day) return;
      day.reminders = [...day.reminders, reminder].sort((a, b) => sortByDateAdc(a.dateTime, b.dateTime));
    })
  }

  private mapDeleteReminders() {
    this.mapCalendar = this.calendar.reduce((acc, item) => acc.set(item.id, item), new Map());
    this.reminders.forEach(reminder => {
      const day: any = this.mapCalendar.get(reminder.date);
      if (!day) return;
      day.reminders = [];
    })
  }

  private mapDeleteReminder(reminder: Reminder) {
    this.mapCalendar = this.calendar.reduce((acc, item) => acc.set(item.id, item), new Map());
    const day: any = this.mapCalendar.get(reminder.date);
    if (!day) return;
    day.reminders = [...day.reminders, reminder].sort((a, b) => sortByDateAdc(a.dateTime, b.dateTime)).filter(r => r.id !== reminder.id);
  }

  private mapAddReminder(reminder: Reminder) {
    this.mapCalendar = this.calendar.reduce((acc, item) => acc.set(item.id, item), new Map());
    const day: any = this.mapCalendar.get(reminder.date);
    if (!day) return;
    day.reminders = [...day.reminders, reminder].sort((a, b) => sortByDateAdc(a.dateTime, b.dateTime));
  }

  private mapEditReminder(reminder: Reminder) {
    this.mapCalendar = this.calendar.reduce((acc, item) => acc.set(item.id, item), new Map());
    const day: any = this.mapCalendar.get(reminder.date);
    if (!day) return;
    day.reminders = day.reminders.filter((d: any) => d.id !== reminder.id);
    day.reminders = [...day.reminders, reminder].sort((a, b) => sortByDateAdc(a.dateTime, b.dateTime));;
  }

}
