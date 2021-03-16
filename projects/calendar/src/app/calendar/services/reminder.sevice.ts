import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CalendarDay } from '../../shared/types/calendar-day';
import { Reminder } from '../../shared/types/reminder';

@Injectable({ providedIn: 'root' })
export class ReminderService {
  public reminders: Reminder[] = []
  public remindersChange: Subject<Reminder[]> = new Subject<Reminder[]>();

  constructor() { }

  public addReminder(reminder: Reminder) {
    this.reminders = [...this.reminders, reminder];
    this.remindersChange.next(this.reminders);
  }

  public editReminder(oldReminder: Reminder, reminder: Reminder) {
    this.reminders = this.reminders.filter(r => r.id !== oldReminder.id);
    this.reminders = [...this.reminders, reminder];
    this.remindersChange.next(this.reminders);
  }

  public removeReminder(id: string) {
    this.reminders = this.reminders.filter(r => r.id !== id);
    this.remindersChange.next(this.reminders);
  }

  public removeAllReminders(day: CalendarDay) {
    this.reminders = this.reminders.filter(r => day.date.toLocaleDateString() !== r.date);
    this.remindersChange.next(this.reminders);
  }

}