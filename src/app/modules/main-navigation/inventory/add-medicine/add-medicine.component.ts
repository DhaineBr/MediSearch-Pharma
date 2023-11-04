import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';



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


  constructor(private dialogRef: MatDialogRef<AddMedicineComponent>, private fb: FormBuilder) {
    this.initializeForm();
  }

  ngOnInit(): void {
    this.initializeForm();
  }



  initializeForm(): void {
    this.medicineForm = this.fb.group({
      itemNumber: ['', Validators.required],
      productName: ['', Validators.required],
      quantity: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0.01)]],
      expirationDate: ['', Validators.required]
    });
  }




  onSubmit(): void {
    if (this.medicineForm.valid) {
      const newMedicine = {
        itemNo: this.medicineForm.value.itemNumber,
        productName: this.medicineForm.value.productName,
        quantity: this.medicineForm.value.quantity,
        price: this.medicineForm.value.price,
        expirationDate: this.medicineForm.value.expirationDate,
      };

      this.dialogRef.close(newMedicine);
    } else {
      // Handle invalid form data here if needed.
    }
  }


}

