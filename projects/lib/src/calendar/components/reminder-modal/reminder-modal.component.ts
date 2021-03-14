import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { CalendarDay } from '../../shared/types/calendar-day';

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
      name: ['', [Validators.required]],
      time: ['', [Validators.required]],
      city: ['', [Validators.required]],
      color: ['#3F51B5'],
    });
    this.reminderForm.patchValue(this.data.day);
  }


  public onCreate() {
    if (this.reminderForm.invalid) return;
    this.dialogRef.close(this.reminderForm.value);
  }

  public onCancel() {
    this.dialogRef.close(null);
  }  
}
