import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClientService } from 'src/app/MainNavigation/http-client.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  // Initialize the login form using FormBuilder
  loginForm: FormGroup;

  showInputField: boolean = false;

  constructor(private fb: FormBuilder, private _login: HttpClientService) {
    // Define and create the form controls using FormBuilder
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }
  // get form() { key:}

  toggleInputField() {
    this.showInputField = !this.showInputField;
  }

  login() {
    // this._login.login(this.loginForm.controls['username'], this.loginForm.controls['password'])
  }
}
