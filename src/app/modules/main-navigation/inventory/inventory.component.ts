import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { AddMedicineComponent } from './add-medicine/add-medicine.component';
import { EditMedicineComponent } from './edit-medicine/edit-medicine.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MedicineService } from 'src/app/shared/services/medicine.service';
import { Medicine } from 'src/app/shared/models/medicine';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit{
  inputQuantity: number = 1;
  inputQuantities: number[] = [];
  inventories: Medicine[] = [];
  filteredInventory: Medicine[] = [];
  errorMessage: string | null = null;
  loading = false;

  summaryForm: FormGroup;

  constructor(public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private _medicines : MedicineService,
    private snackBar: MatSnackBar) {
    this.summaryForm = this.formBuilder.group({
      paymentAmount: ['']
    });
    this.paymentAmount = this.summaryForm?.get('paymentAmount')?.value;
  }


  selectedMedicines: any[] = [];
  searchQuery: string = '';

  isExpired(expirationDate: string | Date): boolean {
    const currentDate = new Date();
    const parsedExpirationDate = typeof expirationDate === 'string' ? new Date(expirationDate) : expirationDate;
    return parsedExpirationDate < currentDate;
  }


  sortInventoriesByExpiration(): void {
    this.inventories.sort((a, b) => {
      const aExpired = this.isExpired(a.expirationDate);
      const bExpired = this.isExpired(b.expirationDate);


      if (aExpired && !bExpired) {
        return -1;
      } else if (!aExpired && bExpired) {
        return 1;
      }

      if (a.quantity <= 25 && !(b.quantity <= 25)) {
        return -1;
      } else if (!(a.quantity <= 25) && b.quantity <= 25) {
        return 1;
      }

      return 0;
    });
  }


  ngOnInit(): void {

    this.getAllMedicines();
    this.inputQuantities = Array(this.inventories.length).fill(1);
    console.log('Initialized inputQuantities:', this.inputQuantities);

  }


  getAllMedicines() {
    this._medicines.getAllMedicines().subscribe((response) => {
      this.inventories = Array.isArray(response) ? response : [response];
      this.sortInventoriesByExpiration();
      console.log(this.inventories);


      this.inputQuantities = Array(this.inventories.length).fill(1);
    });
  }



  softDeleteMedicine(medicine: Medicine) {
    this.loading = true;

    this._medicines.softDeleteMedicine(medicine).subscribe(
      () => {
        const archive = "Product archived successfully.";
        this.showSuccessMessage(archive);
      },
      (error) => {
        const archiveError = "Unexpected error: cannot archive product";
        this.openErrorSnackbar(archiveError);
      }
    ).add(() => {
      this.loading = false;
    });

    window.location.reload();
  }


  filterInventory() {
    this.filteredInventory = this.inventories.filter((inventory) =>
      inventory.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  onSearchQueryChange() {
    this.filterInventory();
  }

  openAdd() {
    const dialogRef = this.dialog.open(AddMedicineComponent, {
      width: '30%',
      height: 'auto',
    });

    dialogRef.afterClosed().subscribe((newMedicine) => {
      if (newMedicine) {
        this.inventories.push(newMedicine);
        console.log('Updated Inventories:', this.inventories);
      }
    });
  }

  openEdit(inventories: Medicine) {
    const dialogRef = this.dialog.open(EditMedicineComponent, {
      width: '30%',
      height: 'auto',
      data: { inventoryData: inventories }
    });

    dialogRef.afterClosed().subscribe((updatedData) => {
      if (updatedData) {
        const index = this.inventories.findIndex(item => item.itemNumber === updatedData.itemNumber);
        if (index !== -1) {
          this.inventories[index] = { ...updatedData, itemNumber: updatedData.itemNumber };
        }
      }
    });
  }

  handleBarcodeScan(event: any) {
    const target = event.target as HTMLInputElement;
    if (target && target.value) {
      const scannedBarcode = parseInt(target.value, 10);
      if (!isNaN(scannedBarcode)) {
        const foundItem = this.inventories.find(inventory => inventory.itemNumber === String(scannedBarcode));
        if (foundItem) {
          this.selectMedicine(foundItem);
          target.value = '';
        }
      }
    }
    }

    selectMedicine(inventory: Medicine) {
      const alreadySelected = this.selectedMedicines.some(
        (selectedMedicine) => selectedMedicine.itemNumber === inventory.itemNumber
      );

      if (!alreadySelected) {
        this.selectedMedicines.push(inventory);
        console.log(`Added Medicine: ${inventory.name}`);
      } else {
        const selectedMessage = "Product already selected.";
        this.openErrorSnackbar(selectedMessage)
      }
    }

    removeMedicine(index: number) {
      this.selectedMedicines.splice(index, 1);
      this.inputQuantities = Array(this.inventories.length).fill(1);
    }

    clearSelectedMedicines(): void {
      this.selectedMedicines = [];
      this.inputQuantities = Array(this.inventories.length).fill(1);
    }


totalPrice: number = 0;

  calculateTotalPrice(): number {
    return this.selectedMedicines.reduce((total, selectedMedicine, i) => {
        return total + selectedMedicine.price * this.inputQuantities[i];
    }, 0);
  }

  updateTotal(): void {
    this.totalPrice = this.calculateTotalPrice();
  }

  incrementQuantity(formIndex: number): void {
    if (formIndex >= 0 && formIndex < this.inputQuantities.length) {
      const maxQuantity = this.selectedMedicines[formIndex].quantity;
      if (!isNaN(this.inputQuantities[formIndex]) && this.inputQuantities[formIndex] < maxQuantity) {
        this.inputQuantities[formIndex]++;
        this.updateTotal();
      } else {
        const maximum = 'Maximum quantity reached.';
        this.openErrorSnackbar(maximum)
      }
    }
    console.log('Updated Quantity:', this.inputQuantities);
  }


  decrementQuantity(index: number): void {
    if (!isNaN(this.inputQuantities[index]) && this.inputQuantities[index] > 1) {
      this.inputQuantities[index]--;
      this.updateTotal();
    }
    console.log('Updated Quantity:', this.inputQuantities);
  }

  changeAmount!: number;
  paymentAmount!: number;

  calculateChange() {
  const paymentAmount = this.summaryForm?.get('paymentAmount')?.value || 0;
  const totalPrice = this.calculateTotalPrice();

  if (paymentAmount < totalPrice) {
    const errorMessage = "Insufficient Payment";
    this.openErrorSnackbar(errorMessage);
    return;
  } else{
    this.changeAmount = paymentAmount - totalPrice;
    const successful = "Transaction Successful";
    this.showSuccessMessage(successful)
  }
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

