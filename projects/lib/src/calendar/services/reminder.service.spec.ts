import { TestBed } from "@angular/core/testing";
import { Reminder } from "../shared/types/reminder";
import { ReminderService } from "./reminder.sevice";

describe('ReminderService', () => {
  let service: ReminderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ReminderService,
      ],
    });
    service = TestBed.inject(ReminderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add Reminder', () => {
    const reminder: Reminder = {
      city: 'Test',
      color: '#2478D4',
      dateTime: '25:00:00',
      date: new Date().toLocaleString(),
      forecast: '02d',
      id: new Date().toLocaleDateString(),
      title: 'Test!'
    }
    service.addReminder(reminder);
    expect(service.reminders).toEqual([reminder]);
  });

  it('should remove Reminder', () => {
    const reminder: Reminder = {
      city: 'New York',
      color: '#2478D4',
      dateTime: '13:00:00',
      date: new Date().toLocaleString(),
      forecast: '02d',
      id: new Date().toLocaleDateString(),
      title: 'Party!'
    }
    service.addReminder(reminder);
    expect(service.reminders).toEqual([reminder]);
    service.removeReminder(reminder.id);
    expect(service.reminders).toEqual([]);
  });

  it('should remove all reminders', () => {
    const reminder: Reminder = {
      city: 'New York',
      color: '#2478D4',
      dateTime: '13:00:00',
      date: new Date().toLocaleString(),
      forecast: '02d',
      id: new Date().toLocaleDateString(),
      title: 'Party!'
    }
    const otherReminder: Reminder = {
      city: 'New York',
      color: '#2478D4',
      dateTime: '13:00:00',
      date: new Date().toLocaleString(),
      forecast: '02d',
      id: new Date().toLocaleDateString(),
      title: 'Party!'
    }
    service.addReminder(reminder);
    service.addReminder(otherReminder);
    expect(service.reminders).toEqual([reminder, otherReminder]);
    service.removeAllReminders();
    expect(service.reminders).toEqual([]);
  });  

})