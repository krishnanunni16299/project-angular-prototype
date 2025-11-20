import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MainframeScreen } from '../../../../models/mainframe-screen.model';

@Component({
  selector: 'app-service-of-process-screen',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './service-of-process-screen.component.html',
  styleUrls: ['./service-of-process-screen.component.css']
})
export class ServiceOfProcessScreenComponent implements OnInit {
  @Input() screen: MainframeScreen | null = null;

  sopNumber: string = '';
  caseNumber: string = '';

  // Forwarded date parts with color coding
  forwardedDateParts = [
    { text: '10', color: 'cyan' },
    { text: '-', color: 'cyan' },
    { text: '20', color: 'cyan' },
    { text: '-', color: 'cyan' },
    { text: '2025', color: 'cyan' }
  ];

  // Received date parts with color coding
  receivedDateParts = [
    { text: '10', color: 'green' },
    { text: ' - ', color: 'white' },
    { text: '16', color: 'green' },
    { text: ' - ', color: 'white' },
    { text: '2025', color: 'green' },
    { text: ' at ', color: 'cyan' },
    { text: '10', color: 'green' },
    { text: ' : ', color: 'white' },
    { text: '25', color: 'green' },
    { text: ' A.M.', color: 'cyan' }
  ];

  plaintiffName: string = '';
  plaintiffId: string = '';
  business: string = '';

  // Name fields
  lastName: string = '';
  firstName: string = '';
  middleName: string = '';

  // Plaintiff address (display fields)
  mailingName: string = '';
  cO: string = '';
  address2: string = '';
  address3: string = '';
  city: string = '';
  state: string = 'MD';
  zip: string = '';
  country: string = '';

  // Defendant
  defendantName: string = '';
  defendantAddress1: string = '';
  defendantAddress2: string = '';
  defendantAddress3: string = '';
  defendantCity: string = '';
  defendantState: string = '';
  defendantZip: string = '';
  forgnCountry: string = '';

  ngOnInit(): void {
    // Component initialization
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

