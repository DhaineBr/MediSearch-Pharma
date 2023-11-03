import { Component } from '@angular/core';

interface HistoryRecord {
  referenceNo: string;
  name: string;
  contactNo: string;
  dateTime: string;
  amount: string;
  isDeleted: boolean;
}

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent {
  historyData: HistoryRecord[] = [];
  filteredHistoryRecords: HistoryRecord[] = [];

  constructor() {
    // Generate 15 dummy rows
    this.generateDummyData(15);
  }

  // Method to generate dummy data
  generateDummyData(count: number) {
    for (let i = 1; i <= count; i++) {
      const record: HistoryRecord = {
        referenceNo: `REF-${i}`,
        name: `User ${i}`,
        contactNo: `0912345678${i}`,
        dateTime: `01/01/2024 | 0${i}:00`,
        amount: `P ${i * 100}`,
        // Add a new property 'isDeleted' to track the deleted status
        isDeleted: false
      };
      this.historyData.push(record);
    }
  }
  searchQuery: string = '';

  ngOnInit(): void {
    this.filteredHistoryRecords = this.historyData;
  }

  // Method to check if a record matches the search text
  filterHistory() {
    this.filteredHistoryRecords = this.historyData.filter((historyData) =>
    historyData.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }
}
