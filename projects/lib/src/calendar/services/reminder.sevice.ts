import { Injectable } from '@angular/core';
import { Reminder } from '../shared/types/reminder';

@Injectable({ providedIn: 'root' })
export class ReminderService {
  private reminders: Reminder[] = []

  constructor() { }

  public addReminder(reminder: Reminder) {
    this.reminders = [...this.reminders, reminder];
  }

  public removeReminder(id: string) {
    this.reminders = this.reminders.filter(r => r.id !== id);
  }

  public getReminders() {
    return this.reminders;
  }

}