import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MainframeScreen } from '../../../../models/mainframe-screen.model';

@Component({
  selector: 'app-sop-amendment-entry-screen',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './sop-amendment-entry-screen.component.html',
  styleUrls: ['./sop-amendment-entry-screen.component.css']
})
export class SopAmendmentEntryScreenComponent {
  @Input() screen: MainframeScreen | null = null;

  // Service of Process Details
  sopNumber: string = '';
  receivedDateMonth: string = '';
  receivedDateDay: string = '';
  receivedDateYear: string = '';
  receivedTimeHour: string = '';
  receivedTimeMinute: string = '';
  caseNumber: string = '';
  plaintiffId: string = '';
  filingType: string = '';

  // Plaintiff Information
  plaintiffName: string = '';
  plaintiffMailingName: string = '';
  plaintiffCareOf: string = '';
  plaintiffAddress2: string = '';
  plaintiffAddress3: string = '';
  plaintiffCity: string = '';
  plaintiffState: string = '';
  plaintiffZip1: string = '';
  plaintiffZip2: string = '';
  plaintiffCountry: string = '';

  // Defendant Information
  defendantName: string = '';
  defendantAddress1: string = '';
  defendantAddress2: string = '';
  defendantAddress3: string = '';
  defendantCity: string = '';
  defendantState: string = '';
  defendantZip1: string = '';
  defendantZip2: string = '';
  defendantForeignCountry: string = '';

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

