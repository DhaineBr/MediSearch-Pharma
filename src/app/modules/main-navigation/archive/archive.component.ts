import { Component, Inject, OnInit } from '@angular/core';
import { RestoreItemsComponent } from './restore-items/restore-items.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MedicineService } from 'src/app/shared/services/medicine.service';
import { Medicine } from 'src/app/shared/models/medicine';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss']
})
export class ArchiveComponent implements OnInit{

  archives: Medicine[] = [];
  selectedArchives: Medicine[] = [];
  filteredArchive: Medicine[] = [];
  constructor(public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private _medicines : MedicineService,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    // this.archives = this.generateDummyData(10);
    this.getAllArchived();
    this.filteredArchive = this.archives;
  }

  getAllArchived() {
    this._medicines.getAllArchived().subscribe((response) => {
      this.archives = Array.isArray(response) ? response : [response];
      console.log(this.archives);
    });
  }


  searchQuery: string = '';

  filterArchive () {
    this.filteredArchive = this.archives.filter((archive) =>
    archive.name.toLowerCase().includes(this.searchQuery.toLowerCase()))
  }

  selectAll = false;

  toggleSelectAll(event: Event) {
    this.selectAll = (event.target as HTMLInputElement).checked;

    // Loop through all archive items and update their checkbox state
    for (const archive of this.archives) {
      archive.selected = this.selectAll;
    }
  }


toggleItemSelection(archive: Medicine) {
    archive.selected = !archive.selected;

    if (archive.selected) {
      this.selectedArchives.push(archive);
    } else {
      const index = this.selectedArchives.indexOf(archive);
      if (index !== -1) {
        this.selectedArchives.splice(index, 1);
      }
    }
  }

  restoreSelectedMedicines() {
    this.selectedArchives.forEach((archive) => {
      this.restoreDeletedMedicine(archive);
    });

    this.selectedArchives = [];
  }

  hardDeleteSelectedMedicines() {
    this.selectedArchives.forEach((archive) => {
      this.hardDeleteMedicine(archive);
    });

    this.selectedArchives = [];
  }

  restoreDeletedMedicine(archive: Medicine) {
    this._medicines.restoreDeletedMedicine(archive).subscribe(
      () => {
        const restore = 'Product restored successfully';
        this.showSuccessMessage(restore)
      },
      (error) => {
        const restoreError = 'Unexpected error: Could not restore medicine.';
        this.openErrorSnackbar(restoreError)
      }
    );
  }

  hardDeleteMedicine(archive: Medicine) {
    this._medicines.hardDeleteMedicine(archive).subscribe(
      () => {
        const deleted = 'Product deleted successfully';
        this.showSuccessMessage(deleted)
      },
      (error) => {
        const deleteError = 'Unexpected error: Could not delete medicine.';
        this.openErrorSnackbar(deleteError)
      }
    );
  }


  updateSelectAllState() {
    this.selectAll = this.filteredArchive.every((archive) => archive.selected);
  }

  handleDeleteItem(itemId: number) {
    this.filteredArchive = this.filteredArchive.filter((archive) => archive.itemNumber !== String(itemId));
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
