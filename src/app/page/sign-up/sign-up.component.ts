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
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      address: new FormControl(''),
      contactNumber: new FormControl(''),
      openingTime: new FormControl(''),
      closingTime: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl(''),
    });
  }


onSubmit() {
  if (this.userDataForm) {
    const openingTime = this.userDataForm.get('openingTime')?.value;
    const closingTime = this.userDataForm.get('closingTime')?.value;

    if (openingTime && closingTime) {
      const concatenatedTime = `${openingTime} - ${closingTime}`;


      const userData = {
        ...this.userDataForm.value,
        time: concatenatedTime

      };



      // api call
      // this.HttpClientService.registerData(userData).then(response => {
      //   console.log('User registered successfully');

      //   this.router.navigate(['/login']);
      // }).catch(error => {
      //   console.error('Error during user registration:', error);
      // });

      console.log(this.userDataForm.value)
     console.log(concatenatedTime);
    }
  }
}


}




