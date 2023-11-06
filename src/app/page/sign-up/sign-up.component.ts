import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import * as L from 'leaflet';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})

export class SignUpComponent implements OnInit {
  private map: L.Map | undefined;
  private customIcon: L.Icon | undefined;
  private customMarker: L.Marker<any> | undefined;
  public coordinatesControl: FormControl;
  public userDataForm: FormGroup;

  constructor() {
    this.coordinatesControl = new FormControl('');
    this.userDataForm = new FormGroup({
      name: new FormControl(''),
      email: new FormControl(''),
      address: new FormControl(''),
      coordinates: this.coordinatesControl,
      storeHours: new FormControl(''),
      contactNumber: new FormControl(''),
      password: new FormControl(''),
    });

  }

  ngOnInit(): void {
    this.initializeMap();
  }



  private initializeMap(): void {
    this.map = L.map('map').setView([13.758447669619404, 121.05859497704944], 20);

    if (this.map) {
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(this.map);

      this.customIcon = L.icon({
        iconUrl: './../../../assets/10 open store.png',
        iconSize: [50, 50],
        iconAnchor: [16, 32]
      });

      if (this.customIcon) {
        this.customMarker = L.marker([13.758447669619404, 121.05859497704944], {
          icon: this.customIcon,
          draggable: true
        });

        if (this.customMarker) {
          this.customMarker.addTo(this.map);
        }
      }
    }


    this.map.on('click', (e: L.LeafletMouseEvent) => {
      if (this.customMarker) {
        this.customMarker.setLatLng(e.latlng);
        this.coordinatesControl.setValue(`${e.latlng.lat}, ${e.latlng.lng}`);
      }
    });

    if (this.map) {
      this.map.locate({ setView: true, maxZoom: 15 });
    }

    if (!this.map) {
      console.error('Map is not defined.');
    }


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








