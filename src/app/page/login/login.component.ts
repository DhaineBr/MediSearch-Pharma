import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserCredentials } from 'src/app/shared/models/user-credentials';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loading = false;
  loginForm: FormGroup;
  showInputField: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
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
    this.loading = true;

    const credentials: UserCredentials = this.loginForm.getRawValue();
    credentials.authType = 'pharmacy_staff';

    this.authService.login(credentials).subscribe(
      (response) => {
        localStorage.setItem('authToken', response.authToken);
        this.router.navigate(['/home', 'dashboard']);
      },
      (error) => {
        if (error.status === 400) {
          const error400 = "Missing required field/s.";
          this.openErrorSnackbar(error400);
        } else {
          const unexpected = "Incorrect Email or Password.";
          this.openErrorSnackbar(unexpected);
        }
      }
    ).add(() => {
      this.loading = false;
    });
  }


  openErrorSnackbar(errorMessage: string): void {
    this.snackBar.open(errorMessage, 'Dismiss', {
      duration: 5000,
    });
  }

  showSuccessMessage(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
      panelClass: ['success-snackbar'],
    });
  }
}
