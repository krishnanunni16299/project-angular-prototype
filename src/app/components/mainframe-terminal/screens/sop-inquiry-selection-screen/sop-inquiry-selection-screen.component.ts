import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MainframeScreen } from '../../../../models/mainframe-screen.model';

@Component({
  selector: 'app-sop-inquiry-selection-screen',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './sop-inquiry-selection-screen.component.html',
  styleUrls: ['./sop-inquiry-selection-screen.component.css']
})
export class SopInquirySelectionScreenComponent {
  @Input() screen: MainframeScreen | null = null;
  sopNumber: string = '';
  receivedDate: string = '';
  forwardedDate: string = '';
  caseNumber: string = '';
  plaintiff: string = '';
  mailingName: string = '';
  amendments: any[] = [
    {
      selection: '',
      receivedDateTime: '10-16-2025 at 10:25 A.M.',
      amendmentDetails: 'Amendment 1',
      defCount: '1'
    },
    {
      selection: '',
      receivedDateTime: '10-16-2025 at 10:25 A.M.',
      amendmentDetails: 'Amendment 2',
      defCount: '2'
    },
    
  ];
  ngOnInit(): void {
    this.sopNumber = '00053575';
    this.receivedDate = this.getCurrentDate();
    this.forwardedDate = this.getCurrentDate();
    this.caseNumber = '1-AD1-2';
    this.plaintiff = '';
    this.mailingName = '';
  }
  getCurrentDate(): string {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  getCurrentTime(): string {
    const now = new Date();
    return now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
  }
}
