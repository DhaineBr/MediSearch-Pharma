import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import * as L from 'leaflet';
import { Pharmacy } from 'src/app/shared/models/pharmacy';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PharmacyService } from 'src/app/shared/services/pharmacy.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})

export class SignUpComponent implements OnInit {
  private map: L.Map | undefined;
  private customIcon: L.Icon | undefined;
  private customMarker: L.Marker<any> | undefined;
  public userDataForm: FormGroup;
  loading = false;

  constructor(private fb: FormBuilder,
    private pharmacyService: PharmacyService,
    private snackBar: MatSnackBar,
    private router: Router) {
    this.userDataForm = this.fb.group({
      name: ['', [Validators.required]],
      email: [''],
      address: [''],
      coords: ['13.758447669619404, 121.05859497704944'],
      openingTime: [''],
      closingTime: [''],
      contactNumber: [''],
      password: [''],
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
        (this.userDataForm.get('coords') as FormControl).setValue(`${e.latlng.lat}, ${e.latlng.lng}`);
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
    this.loading = true; // Show loading spinner

    const pharmacyForm = this.userDataForm.getRawValue();
    const newPharmacy = {
      ...pharmacyForm,
      storeHours: pharmacyForm.openingTime + ' - ' + pharmacyForm.closingTime,
    };
    delete newPharmacy.openingTime;
    delete newPharmacy.closingTime;

    this.pharmacyService.createPharmacy(newPharmacy).subscribe(
      (response) => {
        console.log(response);
        const successful = 'Account successfully created. AWAITING VALIDATION';
        this.showSuccessMessage(successful);
        this.router.navigate(['/login']);
      },
      (error) => {
        if (error.status === 400) {
          const error400 = "Missing required field/s.";
          this.openErrorSnackbar(error400);
        } else if (error.status === 500) {
          const error500 = "Account already exists.";
          this.openErrorSnackbar(error500);
        } else {
          const unexpected = "An unexpected error occurred.";
          this.openErrorSnackbar(unexpected);
        }
      }
    ).add(() => {
      this.loading = false; // Hide loading spinner regardless of success or failure
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
