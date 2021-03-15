import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ConfirmationDialogComponent } from './confirmation-dialog.component';

describe('ConfirmationDialogComponent', () => {
  let component: ConfirmationDialogComponent;
  let fixture: ComponentFixture<ConfirmationDialogComponent>;
  let fb: FormBuilder;
  const mockDialogRef = {
    open: jasmine.createSpy('open'),
    close: jasmine.createSpy('close')
  };
  const model: any = {
    title: 'teste',
    message: 'teste'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfirmationDialogComponent,],
      imports: [
        NoopAnimationsModule,
        MatDialogModule
      ],
      providers: [
        { provide: FormBuilder },
        {
          provide: MAT_DIALOG_DATA,
          useValue: model
        },
        { provide: MatDialogRef, useValue: mockDialogRef },
      ]
    }).compileComponents();
    fb = TestBed.inject(FormBuilder);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should onConfirm', () => {
    component.onConfirm();
    expect(component.dialogRef.close).toHaveBeenCalledWith(true);
  });
  
  it('should onDismiss', () => {
    component.onDismiss();
    expect(component.dialogRef.close).toHaveBeenCalledWith(false);
  });
});
