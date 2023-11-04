import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserCredentials } from 'src/app/shared/models/user-credentials';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  // Initialize the login form using FormBuilder
  loginForm: FormGroup;
  showInputField: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      email: [''],
      password: ['']
    });
  }

  ngOnInit(): void {
  }

  async requestLogin() {
  }

  login() {
    const credentials: UserCredentials = this.loginForm.getRawValue();
    credentials.authType = 'pharmacy_staff';
    this.authService.login(credentials).subscribe((response) => {
      localStorage.setItem('authToken', response.authToken);
      this.router.navigate(['/home', 'dashboard']);
    }, (error) => {
      console.log(error);
    });

  }
}
