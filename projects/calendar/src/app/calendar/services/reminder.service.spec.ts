import { TestBed } from "@angular/core/testing";
import { Reminder } from "../../shared/types/reminder";
import { ReminderService } from "./reminder.sevice";
import { v4 as uuidv4 } from 'uuid';

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
      dateTime: new Date(),
      date: new Date().toLocaleString(),
      forecast: '02d',
      id: uuidv4(),
      title: 'Test!'
    }
    service.addReminder(reminder);
    expect(service.reminders).toEqual([reminder]);
  });

  it('should remove Reminder', () => {
    const reminder: Reminder = {
      city: 'New York',
      color: '#2478D4',
      dateTime: new Date(),
      date: new Date().toLocaleString(),
      forecast: '02d',
      id: uuidv4(),
      title: 'Party!'
    }
    service.addReminder(reminder);
    expect(service.reminders).toEqual([reminder]);
    service.removeReminder(reminder.id);
    expect(service.reminders).toEqual([]);
  });

  it('should editReminder Reminder', () => {
    const oldReminder: Reminder = {
      city: 'New York',
      color: '#2478D4',
      dateTime: new Date(),
      date: new Date().toLocaleString(),
      forecast: '02d',
      id: uuidv4(),
      title: 'Party!'
    };
    service.addReminder(oldReminder);
    const reminder: Reminder = {
      city: 'Indaial',
      color: '#2478D4',
      dateTime: new Date(),
      date: new Date().toLocaleString(),
      forecast: '02d',
      id: uuidv4(),
      title: 'Party!'
    };
    service.editReminder(oldReminder, reminder);
    expect(service.reminders).toEqual([reminder]);
  });

  it('should remove all reminders', () => {
    const reminder: Reminder = {
      city: 'New York',
      color: '#2478D4',
      dateTime: new Date(),
      date: new Date().toLocaleDateString(),
      forecast: '02d',
      id: uuidv4(),
      title: 'Party!'
    }
    const otherReminder: Reminder = {
      city: 'New York',
      color: '#2478D4',
      dateTime: new Date(),
      date: new Date().toLocaleDateString(),
      forecast: '02d',
      id: uuidv4(),
      title: 'Party!'
    }
    service.addReminder(reminder);
    service.addReminder(otherReminder);
    expect(service.reminders).toEqual([reminder, otherReminder]);
    const mockDay: any = { date: new Date() };
    service.removeAllReminders(mockDay);
    expect(service.reminders).toEqual([]);
  });

})