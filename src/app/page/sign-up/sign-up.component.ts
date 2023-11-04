import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import * as L from 'leaflet';
import { HttpClientService } from 'src/app/MainNavigation/http-client.service';



@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {




  userDataForm: FormGroup; // Create a form group for user data

  constructor(private router: Router, private HttpClientService: HttpClientService) {
    // Initialize the form group with form controls
    this.userDataForm = new FormGroup({
      name: new FormControl(''),
      // lastName: new FormControl(''),
      email: new FormControl(''),
      address: new FormControl(''),
      coords: new FormControl(''),
      storeHours: new FormControl(''),
      contactNumber: new FormControl(''),
      password: new FormControl(''),

    });
  }


onSubmit() {
//   const formData = this.userDataForm.value;

//   this.HttpClientService.registerData(formData).then(response => {
//     console.log('User registered successfully');

//     console.log(this.userDataForm.value)
//   }).catch(error => {
//     console.error('Error during user registration:', error);
//       console.log(this.userDataForm.value)
//   });
//     console.log(this.userDataForm.value)
// }
  }
}




