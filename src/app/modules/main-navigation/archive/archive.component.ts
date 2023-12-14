import { Component, Inject, OnInit } from '@angular/core';
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
  loading = false;
  constructor(private _medicines : MedicineService,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getAllArchived();
  }

  getAllArchived() {
    this._medicines.getAllArchived().subscribe((response) => {
      this.archives = Array.isArray(response) ? response : [response];
      console.log(this.archives);
    });
  }


  searchQuery: string = '';



  selectAll = false;

  toggleSelectAll(event: Event) {
    this.selectAll = (event.target as HTMLInputElement).checked;

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
    this.loading = true;

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
    this.loading = true;

    this._medicines.restoreDeletedMedicine(archive).subscribe(
      () => {
        const restore = 'Product restored successfully';
        this.showSuccessMessage(restore);
      },
      (error) => {
        const restoreError = 'Unexpected error: Could not restore medicine.';
        this.openErrorSnackbar(restoreError);
      }
    ).add(() => {
      this.loading = false;
   });

   window.location.reload();
  }

  hardDeleteMedicine(archive: Medicine) {
    this.loading = true;

    this._medicines.hardDeleteMedicine(archive).subscribe(
      () => {
        const deleted = 'Product deleted successfully';
        this.showSuccessMessage(deleted);
      },
      (error) => {
        const deleteError = 'Unexpected error: Could not delete medicine.';
        this.openErrorSnackbar(deleteError);
      }
    ).add(() => {
      this.loading = false;
    });
    window.location.reload();
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
