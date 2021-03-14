import { Component, OnInit, SimpleChanges } from '@angular/core';
import { CalendarDay } from '../shared/types/calendar-day';
import { CalendarService } from './services/calendar.service';
import { daysOfWeek, monthNames, sortByDateAdc } from '../shared/utils';
import { ReminderModalComponent } from './components/reminder-modal/reminder-modal.component';
import { ReminderService } from './services/reminder.sevice';
import { Reminder } from '../shared/types/reminder';
import { MatDialog } from '@angular/material/dialog';
import { MatDatepicker } from '@angular/material/datepicker';

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
    this.mapReminders();
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
    const dialogRef = this.dialog.open(ReminderModalComponent, {
      maxWidth: "550px",
      data: {
        edit: true,
        reminder
      }
    });

    dialogRef.afterClosed().subscribe((editedReminder: Reminder) => {
      if (!editedReminder) return;
      if (editedReminder.id !== reminder.id) {
        const day: any = this.mapCalendar.get(reminder.date);
        day.reminders = day.reminders.filter((d: any) => d.id !== reminder.id);
      }
      this.reminderService.editReminder(editedReminder);
      this.mapEditReminder(editedReminder);
    });
  }

  public onCreateReminder(day: CalendarDay) {
    const dialogRef = this.dialog.open(ReminderModalComponent, {
      maxWidth: "550px",
      data: {
        day
      }
    });

    dialogRef.afterClosed().subscribe((reminder: Reminder) => {
      if (reminder) {
        this.reminderService.addReminder(reminder);
        this.mapAddReminder(reminder);
      }
    });
  }

  public deleteAllReminders() {
    this.mapDeleteReminders();
    this.reminderService.removeAllReminders();
  }

  chosenMonthHandler(date: any, datepicker: MatDatepicker<Date>) {
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
