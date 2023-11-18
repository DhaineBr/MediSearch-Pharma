import { Component, Inject, OnInit } from '@angular/core';
import { RestoreItemsComponent } from './restore-items/restore-items.component';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';

interface Archive {
  itemNo: number;
  productName: string;
  quantity: number;
  price: number;
  expirationDate: string;
  selected: boolean;
}

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss']
})
export class ArchiveComponent implements OnInit{

  archives: Archive[] = [];
  filteredArchive: Archive[] = [];
  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    this.archives = this.generateDummyData(10);
    this.filteredArchive = this.archives;
  }

  generateDummyData(count: number): Archive[] {
    const dummyInventory: Archive[] = [];

    for (let i = 1; i <= count; i++) {
      const archive: Archive = {
        itemNo: 7121099996 + i,
        productName: `Medicine ` + (7121099997 + i),
        quantity: 10 + i,
        price: 10 + i,
        expirationDate: `01/01/2024`,
        selected: false
      };

      dummyInventory.push(archive);
    }

    return dummyInventory;
  }


  searchQuery: string = '';

  filterArchive () {
    this.filteredArchive = this.archives.filter((archive) =>
    archive.productName.toLowerCase().includes(this.searchQuery.toLowerCase()))
  }

  selectAll = false; // Initialize the header checkbox state

  toggleSelectAll(event: Event) {
    this.selectAll = (event.target as HTMLInputElement).checked;

    // Loop through the archive items and update their checkbox state
    for (const archive of this.filteredArchive) {
      archive.selected = this.selectAll;
    }
  }

  // Function to handle individual row checkbox click event
  toggleItemSelection(archive: Archive) {
    archive.selected = !archive.selected;
    this.updateSelectAllState();
  }

  // Helper function to update the state of the "Select All" checkbox
  updateSelectAllState() {
    this.selectAll = this.filteredArchive.every((archive) => archive.selected);
  }

  handleDeleteItem(itemId: number) {
    // Find and remove the deleted item from filteredArchive
    this.filteredArchive = this.filteredArchive.filter((archive) => archive.itemNo !== itemId);
  }

  permanentlyDelete() {
    const selectedArchives = this.filteredArchive.filter((archive) => archive.selected);

    for (const archive of selectedArchives) {
      const index = this.filteredArchive.indexOf(archive);
      if (index !== -1) {
        this.filteredArchive.splice(index, 1);
      }
    }
  }
}
