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
      city: 'New York',
      color: '#2478D4',
      hour: '13:00:00',
      date: new Date(),
      forecast: '02d',
      id: new Date().toLocaleDateString(),
      title: 'Party!'
    }
    service.addReminder(reminder);
    expect((service as any).reminders).toEqual([reminder]);
  });

  it('should remove Reminder', () => {
    const reminder: Reminder = {
      city: 'New York',
      color: '#2478D4',
      hour: '13:00:00',
      date: new Date(),
      forecast: '02d',
      id: new Date().toLocaleDateString(),
      title: 'Party!'
    }
    service.addReminder(reminder);
    expect((service as any).reminders).toEqual([reminder]);
    service.removeReminder(reminder.id);
    expect((service as any).reminders).toEqual([]);
  });

})