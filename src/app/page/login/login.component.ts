import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  // Initialize the login form using FormBuilder
  loginForm: FormGroup;

  showInputField: boolean = false;

  constructor(private fb: FormBuilder) {
    // Define and create the form controls using FormBuilder
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  toggleInputField() {
    this.showInputField = !this.showInputField;
  }
}
