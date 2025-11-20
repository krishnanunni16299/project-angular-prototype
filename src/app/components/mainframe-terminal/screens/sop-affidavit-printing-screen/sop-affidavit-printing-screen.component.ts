import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MainframeScreen } from '../../../../models/mainframe-screen.model';

@Component({
  selector: 'app-sop-affidavit-printing-screen',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './sop-affidavit-printing-screen.component.html',
  styleUrls: ['./sop-affidavit-printing-screen.component.css']
})
export class SopAffidavitPrintingScreenComponent {
  @Input() screen: MainframeScreen | null = null;

  sopNumber: string = '';
  caseNumber: string = '';
  receivedDate: string = '';
  forwardedDate: string = '';
  plaintiff: string = '';
  defendant: string = '';
  certifiedMailNumber: string = '';
  uspsResponse: string = '';
  addressToName: string = '';
  street: string = '';
  city: string = '';
  state: string = '';
  zip1: string = '';
  zip2: string = '';
  signedBy: string = '';
  designation: string = '';
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

