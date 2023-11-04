import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { AddMedicineComponent } from './add-medicine/add-medicine.component';
import { EditMedicineComponent } from './edit-medicine/edit-medicine.component';


interface Inventory {
  itemNo: number;
  productName: string;
  quantity: number;
  price: number;
  expirationDate: Date;
}

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit{
  inputQuantity: number = 1;
  inputQuantities: number[] = [];
  inventories: Inventory[] = [];
  filteredInventory: Inventory[] = [];

  constructor(public dialog: MatDialog) {}

  selectedMedicines: any[] = [];

  searchQuery: string = '';

  ngOnInit(): void {
    this.inventories = this.generateDummyData(10);
    this.filteredInventory = this.inventories;

    this.inputQuantities = Array(this.inventories.length).fill(1);
    console.log('Initialized inputQuantities:', this.inputQuantities);
  }

  generateDummyData(count: number): Inventory[] {
    const dummyInventory: Inventory[] = [];

    for (let i = 1; i <= count; i++) {
      const expirationDate = new Date('2023-10-24');
      expirationDate.setDate(expirationDate.getDate() + i);

      const inventory: Inventory = {
        itemNo: 7121099996 + i,
        productName: `Medicine ` + (7121099997 + i),
        quantity: 10 + i,
        price: 10 + i,
        expirationDate: expirationDate
      };

      dummyInventory.push(inventory);
    }

    return dummyInventory;
  }

  filterInventory() {
    this.filteredInventory = this.inventories.filter((inventory) =>
      inventory.productName.toLowerCase().includes(this.searchQuery.toLowerCase())
    )
  }

  openAdd() {
    const dialogRef = this.dialog.open(AddMedicineComponent, {
      width: '30%',
      height: '72.5%',
    });

    dialogRef.afterClosed().subscribe((newMedicine) => {
      if (newMedicine) {

        this.inventories.push(newMedicine);

        console.log('Updated Inventories:', this.inventories);
      }
    });
  }

  openEdit(inventory: Inventory) {
    const dialogRef = this.dialog.open(EditMedicineComponent, {
      width: '30%',
      height: 'auto',
      data: { inventoryData: inventory }
    });

    dialogRef.afterClosed().subscribe((updatedData) => {
      if (updatedData) {
        const index = this.inventories.findIndex(item => item.itemNo === updatedData.itemNumber);
        if (index !== -1) {
          this.inventories[index] = { ...updatedData, itemNo: updatedData.itemNumber };
        }
      }
    });
  }

  handleBarcodeScan(event: any) {
    const target = event.target as HTMLInputElement;

    if (target && target.value) {
      const scannedBarcode = parseInt(target.value, 10);

      if (!isNaN(scannedBarcode)) {
        const foundItem = this.inventories.find(inventory => inventory.itemNo === scannedBarcode);
        if (foundItem) {
          this.selectMedicine(foundItem);
          target.value = '';
        }
      }
    }
    }

    selectMedicine(inventory: Inventory) {
      const alreadySelected = this.selectedMedicines.some(
        (selectedMedicine) => selectedMedicine.itemNo === inventory.itemNo
      );

      if (!alreadySelected) {
        this.selectedMedicines.push(inventory); // Add the medicine to selectedMedicines
        console.log(`Added Medicine: ${inventory.productName}`); // Log the added medicine
      }
    }

    removeMedicine(index: number) {
      this.selectedMedicines.splice(index, 1);
    }

    clearSelectedMedicines(): void {
      this.selectedMedicines = [];
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



  incrementQuantity(index: number): void {
    if (!isNaN(this.inputQuantities[index])) {
      this.inputQuantities[index]++;
      this.updateTotal();
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


}





