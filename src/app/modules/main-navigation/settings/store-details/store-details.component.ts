import { Component } from '@angular/core';

@Component({
  selector: 'app-store-details',
  templateUrl: './store-details.component.html',
  styleUrls: ['./store-details.component.scss']
})
export class StoreDetailsComponent {
  formData: any = {}; // Initialize formData as needed
  fileName: string = '';

  // Define properties for the image and file
  selectedImage: File | null = null;
  image: string | null = null;

  firstName: string = '';
  lastName: string = '';
  companyName: string = '';
  address: string = '';
  storeHours: string = '';
  contactInfo: string = '';

  saveChanges() {
    const payload = {
      'firstname': this.firstName,
      'lastname': this.lastName,
      'companyname': this.companyName,
      'address': this.address,
      'storehours': this.storeHours,
      'contactinformation': this.contactInfo,
      'profile': this.selectedImage
    }

    console.log(payload)

    // Check if an image has been selected
    if (this.selectedImage) {
      // Handle the selected image file here, for example, you can upload it to a server
      console.log('Selected Image File:', this.selectedImage);
  }
  }

  onFileSelected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const files = inputElement.files;

    if (files && files.length > 0) {

      const selectedFile = files[0];
      this.selectedImage = files[0]
      this.fileName = selectedFile.name;
      this.image = URL.createObjectURL(selectedFile);

      this.formData.image = selectedFile;
    }
  }
}
