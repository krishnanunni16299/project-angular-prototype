import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MainframeScreen } from '../../../../models/mainframe-screen.model';

@Component({
  selector: 'app-sop-maintenance-selection-screen',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './sop-maintenance-selection-screen.component.html',
  styleUrls: ['./sop-maintenance-selection-screen.component.css']
})
export class SopMaintenanceSelectionScreenComponent implements OnInit {
  @Input() screen: MainframeScreen | null = null;

  sopNumber: string = '';
  receivedDate: string = '';
  forwardedDate: string = '';
  caseNumber: string = '';
  plaintiff: string = '';
  mailingName: string = '';

  // Amendment list (empty for now, will be populated with data)
  amendments: Array<{
    selection: string;
    receivedDateTime: string;
    amendmentDetails: string;
    defCount: string;
  }> = [];

  ngOnInit(): void {
    // Component initialization
    // Initialize empty amendment rows if needed
    for (let i = 0; i < 10; i++) {
      this.amendments.push({
        selection: '',
        receivedDateTime: '',
        amendmentDetails: '',
        defCount: ''
      });
    }
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

