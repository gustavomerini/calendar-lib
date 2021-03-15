import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { ForecastService } from '../../services/forecast.service';
import { CalendarDay } from '../../../shared/types/calendar-day';
import { Reminder } from '../../../shared/types/reminder';

export interface DialogData {
  day: CalendarDay;
  reminder: Reminder;
  edit: boolean;
}

@Component({
  selector: 'app-reminder-modal',
  templateUrl: './reminder-modal.component.html',
  styleUrls: ['./reminder-modal.component.scss']
})
export class ReminderModalComponent implements OnInit {

  public reminderForm: FormGroup = new FormGroup({});
  public backgroundColor: string = '#3f51b5';
  public show = false;
  public loading = false;

  constructor(public dialogRef: MatDialogRef<ReminderModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private forecastService: ForecastService
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    this.reminderForm = this.fb.group({
      dateTime: ['', [Validators.required]],
      title: ['', [Validators.required, Validators.maxLength(30)]],
      city: ['', [Validators.required]],
      color: ['#3F51B5'],
    });
    if (this.data.edit) {
      this.reminderForm.patchValue(this.data.reminder) 
      this.setColor(this.data.reminder.color)
      return;
    }
    this.reminderForm.patchValue({ ...this.data.day, dateTime: this.data.day.date });
  }

  public setColor(color: string) {
    this.backgroundColor = color;
    this.reminderForm.controls.color.setValue(color);
    this.show = false;
  }


  public onCreate() {
    if (this.reminderForm.invalid) {
      this.reminderForm.markAllAsTouched();
      return;
    };
    this.loading = true;
    const formValue = this.reminderForm.value;
    const reminder: Reminder = {
      ...formValue,
      dateTime: formValue.dateTime,
      date: formValue.dateTime.toLocaleDateString(),
      id: formValue.dateTime.toLocaleString()
    }
    this.forecastService.forecast(reminder.city, reminder.dateTime).subscribe((response) => {
      reminder.forecast = response.weather;
      this.dialogRef.close(reminder);
    },
      err => {
        this.dialogRef.close(reminder);
      })
  }

  public onCancel() {
    this.dialogRef.close(null);
  }

  public toggleColors(): void {
    this.show = !this.show;
  }
}
