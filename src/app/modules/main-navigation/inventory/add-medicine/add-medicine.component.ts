import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Medicine } from 'src/app/shared/models/medicine';
import { MedicineService } from 'src/app/shared/services/medicine.service';

@Component({
  selector: 'app-add-medicine',
  templateUrl: './add-medicine.component.html',
  styleUrls: ['./add-medicine.component.scss']
})
export class AddMedicineComponent implements OnInit {
  medicineForm!: FormGroup;
  itemNumberErrorMessage: string = '';
  productNameErrorMessage: string = '';
  quantityErrorMessage: string = '';
  priceErrorMessage: string = '';
  expirationDateErrorMessage: string = '';


  constructor(private dialogRef: MatDialogRef<AddMedicineComponent>,
    private fb: FormBuilder,
    private medicineService: MedicineService) {
    this.initializeForm();
  }

  ngOnInit(): void {
    this.initializeForm();
  }



  initializeForm(): void {
    this.medicineForm = this.fb.group({
      itemNumber: ['', Validators.required],
      pharmacyId: [2, Validators.required],
      name: ['', Validators.required],
      category: ['', Validators.required],
      quantity: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0.01)]],
      expirationDate: ['', Validators.required]
    });
  }


  onSubmit() {
    const medicineForm = this.medicineForm.getRawValue();
    const newMedicine = {
      ...medicineForm,
    };
    this.medicineService.createMedicine(newMedicine).subscribe((response) => {
      console.log(response);
    });
  }


}

