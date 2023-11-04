import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-permanently-delete',
  templateUrl: './permanently-delete.component.html',
  styleUrls: ['./permanently-delete.component.scss']
})
export class PermanentlyDeleteComponent implements OnInit {
  @Output() deleteItem: EventEmitter<number> = new EventEmitter<number>();
  passwordForm: FormGroup;

  constructor(private dialogRef: MatDialogRef<PermanentlyDeleteComponent>, private fb: FormBuilder) {
    this.passwordForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(8)]] // Add your password validation rules here
    });
  }

  ngOnInit(): void {}

  closeDialog() {
    this.dialogRef.close();
  }

  permanentlyDelete() {
    const password = this.passwordForm.value.password;

    if (password === '12345') {
      const itemId = 123;
      this.deleteItem.emit(itemId);
      this.dialogRef.close('deleted');

    } else {

      this.passwordForm.get('password')?.setErrors({ incorrectPassword: true });
    }
  }

}
