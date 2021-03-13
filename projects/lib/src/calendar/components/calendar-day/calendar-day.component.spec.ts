import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CalendarService } from '../../services/calendar.service';

import { CalendarDayComponent } from './calendar-day.component';

describe('CalendarDayComponent', () => {
  let component: CalendarDayComponent;
  let fixture: ComponentFixture<CalendarDayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CalendarDayComponent],
      providers: [
        CalendarService
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
