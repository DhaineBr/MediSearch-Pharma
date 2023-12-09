import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Medicine } from 'src/app/shared/models/medicine';
import { MedicineService } from 'src/app/shared/services/medicine.service';

@Component({
  selector: 'app-edit-medicine',
  templateUrl: './edit-medicine.component.html',
  styleUrls: ['./edit-medicine.component.scss']
})
export class EditMedicineComponent implements OnInit {
  medicineForm!: FormGroup;


  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<EditMedicineComponent>,
    private medicineService: MedicineService
  ) {
    this.initializeForm();
  }


  ngOnInit(): void {

    this.initializeForm();
  }

  initializeForm(): void {
    this.medicineForm = this.fb.group({
      itemNumber: ['', Validators.required],
      name: ['', Validators.required],
      quantity: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0.01)]],
      expirationDate: ['', Validators.required],
      pharmacyId: ['', Validators.required]
    });

    if (this.data.inventoryData) {
      this.medicineForm.patchValue({
        itemNumber: this.data.inventoryData.itemNumber,
        name: this.data.inventoryData.name,
        quantity: this.data.inventoryData.quantity,
        price: this.data.inventoryData.price,
        expirationDate: this.data.inventoryData.expirationDate,
        pharmacyId: this.data.inventoryData.pharmacyId
      });
    }
  }

  onSubmit() {
    const medicineForm = this.medicineForm.getRawValue();
    const updatedMedicine = {
      ...medicineForm,
    };
    this.medicineService.updateMedicine(updatedMedicine).subscribe((response) => {
      console.log(response);
    });
  }

}
