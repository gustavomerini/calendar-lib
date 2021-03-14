import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { CalendarDay } from '../../shared/types/calendar-day';
import { Reminder } from '../../shared/types/reminder';

export interface DialogData {
  day: CalendarDay;
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

  constructor(public dialogRef: MatDialogRef<ReminderModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialog: MatDialog,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    this.reminderForm = this.fb.group({
      date: ['', [Validators.required]],
      title: ['', [Validators.required]],
      city: ['', [Validators.required]],
      color: ['#3F51B5'],
    });
    this.reminderForm.patchValue(this.data.day);
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
    const formValue = this.reminderForm.value;
    const reminder: Reminder = {
      ...formValue,
      date: formValue.date.toLocaleDateString(),
      id: formValue.date.toLocaleString()

    }
    this.dialogRef.close(reminder);
  }

  public onCancel() {
    this.dialogRef.close(null);
  }

  public toggleColors(): void {
    this.show = !this.show;
  }
}
