import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MainframeScreen } from '../../../../../models/mainframe-screen.model';

@Component({
  selector: 'app-sop-standalone-letter-screen',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './sop-standalone-letter-screen.component.html',
  styleUrls: ['./sop-standalone-letter-screen.component.css']
})
export class SopStandaloneLetterScreenComponent {
  @Input() screen: MainframeScreen | null = null;

  caseNumber: string = '';
  name: string = '';
  address1: string = '';
  address2: string = '';
  address3: string = '';
  defendant: string = '';
  
  // Reason selections
  reason1: boolean = false; // Required $50 Filing Fee per Defendant not enclosed
  reason2: boolean = false; // Additional copy of the Writ of Summons was not enclosed
  reason3: boolean = false; // Additional copy of Complaint and/or Supporting Documents were not enclosed
  reason4: boolean = false; // No Trial Date and/or Case Number has been assigned
  reason5: boolean = false; // Other (Please Specify)
  otherReason1: string = '';
  otherReason2: string = '';
  otherReason3: string = '';
  printer: string = 'T891';

  getCurrentDate(): string {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  getCurrentTime(): string {
    const now = new Date();
    return now.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit', 
      hour12: false 
    });
  }
}

