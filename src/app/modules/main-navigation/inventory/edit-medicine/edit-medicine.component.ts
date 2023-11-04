import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-medicine',
  templateUrl: './edit-medicine.component.html',
  styleUrls: ['./edit-medicine.component.scss']
})
export class EditMedicineComponent implements OnInit {
  medicineForm!: FormGroup;
  itemNumberErrorMessage: string = '';
  productNameErrorMessage: string = '';
  quantityErrorMessage: string = '';
  priceErrorMessage: string = '';
  expirationDateErrorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<EditMedicineComponent>  // Inject MatDialogRef to close the dialog
  ) {
    this.initializeForm();
  }


  ngOnInit(): void {
    // Initialize the form and populate it with data if available
    this.initializeForm();
  }

  initializeForm(): void {
    // Create the medicineForm FormGroup with validators
    this.medicineForm = this.fb.group({
      itemNumber: ['', Validators.required],
      productName: ['', Validators.required],
      quantity: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0.01)]],
      expirationDate: ['', Validators.required]
    });

    // Populate form fields with data if available
    if (this.data.inventoryData) {
      this.medicineForm.patchValue({
        itemNumber: this.data.inventoryData.itemNo,
        productName: this.data.inventoryData.productName,
        quantity: this.data.inventoryData.quantity,
        price: this.data.inventoryData.price,
        expirationDate: this.data.inventoryData.expirationDate
      });
    }
  }

  onSubmit(): void {
    if (this.medicineForm.valid) {
      // Handle form submission when it's valid
      console.log('Form submitted!', this.medicineForm.value);

      // Close the dialog and pass the updated data to the parent component
      this.dialogRef.close(this.medicineForm.value);
    } else {
      this.itemNumberErrorMessage = this.medicineForm.get('itemNumber')!.hasError('required') ? 'Item Number is required' : '';
      this.productNameErrorMessage = this.medicineForm.get('productName')!.hasError('required') ? 'Product Name is required' : '';
      this.quantityErrorMessage = this.medicineForm.get('quantity')!.hasError('required') ? 'Quantity is required' : '';
      this.priceErrorMessage = this.medicineForm.get('price')!.hasError('required') ? 'Price is required' : '';
      this.expirationDateErrorMessage = this.medicineForm.get('expirationDate')!.hasError('required') ? 'Expiration Date is required' : '';
    }
  }

}
