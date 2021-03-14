import { Component, OnInit } from '@angular/core';
import { CalendarDay } from './shared/types/calendar-day';
import { CalendarService } from './services/calendar.service';
import { daysOfWeek, monthNames } from './shared/utils';
import { ReminderModalComponent } from './components/reminder-modal/reminder-modal.component';
import { ReminderService } from './services/reminder.sevice';
import { Reminder } from './shared/types/reminder';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'calendar-lib',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  public calendar: CalendarDay[] = [];
  public today: Date = new Date('2021-05-02');
  public selectedDay: CalendarDay = { id: '', date: new Date() };
  public month: string = '';
  public reminders: Reminder[] = [];
  public daysOfWeek = daysOfWeek;
  private monthNames = monthNames;
  constructor(private calendarService: CalendarService, private reminderService: ReminderService, public dialog: MatDialog) { }

  public ngOnInit(): void {
    this.calendar = this.calendarService.getCalendar(this.today);
    this.month = this.monthNames[this.calendar[10].date.getMonth()];
    this.reminderService.remindersChange.subscribe((reminders) => {
      this.reminders = reminders;
    })
  }

  public onSelectDay(day: CalendarDay) {
    if (day.id === this.selectedDay.id) {
      console.log(day.id, this.selectedDay.id)
      this.onCreateReminder(day);
      return;
    }
    this.selectedDay.isActive = false;
    this.selectedDay = day;
    day.isActive = true;
  }

  public onCreateReminder(day: CalendarDay) {
    const dialogRef = this.dialog.open(ReminderModalComponent, {
      maxWidth: "400px",
      data: {
        day
      }
    });

    dialogRef.afterClosed().subscribe((reminder: Reminder) => {
      if (reminder) {
        this.reminderService.addReminder(reminder);
      }
    });
  }

  public deleteAllReminders() {
    this.reminderService.removeAllReminders();
  }

}
