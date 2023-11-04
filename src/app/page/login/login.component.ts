import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClientService } from 'src/app/MainNavigation/http-client.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  // Initialize the login form using FormBuilder
  showInputField: boolean = false;

  constructor(
    private httpClientService: HttpClientService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  loginForm = this.formBuilder.group({
    email: 'pharmacy_staff@domain.com',
    password: '1234567890',
    authType: 'pharma_staff',
  });

  async requestLogin() {
    try {
      const response = await this.httpClientService.postData(this.loginForm.value);
      console.log(response.data);
      // Handle a successful login response here, e.g., store user token and redirect
      this.router.navigate(['/home/dashboard']); // Redirect to the dashboard or the appropriate route
    } catch (error) {
      console.error('Login error:', error);
      // Handle the error, e.g., show an error message to the user.
    }
  }

  login() {
    // this._login.login(this.loginForm.controls['username'], this.loginForm.controls['password'])
  }
}
