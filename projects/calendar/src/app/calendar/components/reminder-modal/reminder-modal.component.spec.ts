import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ForecastService } from '../../services/forecast.service';
import { SharedModule } from '../../../shared/shared.module';
import { Reminder } from '../../../shared/types/reminder';
import { of } from 'rxjs';
import { ReminderModalComponent } from './reminder-modal.component';
import { v4 as uuidv4 } from 'uuid';

describe('ReminderModalComponent', () => {
  let component: ReminderModalComponent;
  let fixture: ComponentFixture<ReminderModalComponent>;
  const mockDialogRef = {
    open: jasmine.createSpy('open'),
    close: jasmine.createSpy('close')
  };
  const model: any = {
    day: { id: '1' },
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SharedModule,
        NoopAnimationsModule,
      ],
      declarations: [ReminderModalComponent],
      providers: [
        MatDialog,
        FormBuilder,
        ForecastService,
        {
          provide: MAT_DIALOG_DATA,
          useValue: model
        },
        { provide: MatDialogRef, useValue: mockDialogRef }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReminderModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should cancel', () => {
    component.onCancel();
    expect(component.dialogRef.close).toHaveBeenCalled();
  });  

  it('should create reminder - Invalid', () => {
    component.reminderForm.patchValue({});
    spyOn(component.reminderForm, 'markAllAsTouched').and.callThrough();
    component.onCreate();
    expect(component.reminderForm.markAllAsTouched).toHaveBeenCalled();
  });

  it('should create reminder - title with length > 30', () => {
    const reminder: Reminder = {
      id: '1',
      city: 'test',
      color: 'test',
      date: '1',
      forecast: '02d',
      dateTime: new Date(),
      title: 'thistitlehastohastohastohastohastohasmorethan30characteres'
    }
    component.reminderForm.patchValue(reminder);
    spyOn(component.reminderForm, 'markAllAsTouched').and.callThrough();
    component.onCreate();
    expect(component.reminderForm.markAllAsTouched).toHaveBeenCalled();
  });  

  it('should create reminder', () => {
    const reminder: Reminder = {
      city: 'test',
      color: 'test',
      forecast: '02d',
      dateTime: new Date(),
      title: 'party',
      forecastDesc: 'clouds',
      date: '',
      id: ''
    }
    reminder.date = reminder.dateTime.toLocaleDateString();
    spyOn((component as any).forecastService,  'forecast').and.callFake(() => of({weather: '02d', description: 'clouds'}))
    component.reminderForm.patchValue(reminder);
    component.onCreate();
    expect(component.dialogRef.close).toHaveBeenCalled();
  });    
});
