import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MainframeScreen } from '../../../../../models/mainframe-screen.model';

@Component({
  selector: 'app-process-work-order-screen',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './process-work-order-screen.component.html',
  styleUrls: ['./process-work-order-screen.component.css']
})
export class ProcessWorkOrderScreenComponent implements OnInit {
  @Input() screen: MainframeScreen | null = null;

  workOrderNumber: string = '0005252111';
  customerId: string = '0004035537';
  updatedDate: string = 'Oct 16 2025 10:25 AM';

  // Transaction rows
  transactions = [
    { selection: '', trxNumber: '001', trxType: 'SP', description: 'TEST DESC ADI', status: '', ok: 'Y', acknowledgement: '' },
    { selection: '', trxNumber: '', trxType: '', description: '', status: '', ok: '', acknowledgement: '' },
    { selection: '', trxNumber: '', trxType: '', description: '', status: '', ok: '', acknowledgement: '' },
    { selection: '', trxNumber: '', trxType: '', description: '', status: '', ok: '', acknowledgement: '' },
    { selection: '', trxNumber: '', trxType: '', description: '', status: '', ok: '', acknowledgement: '' },
    { selection: '', trxNumber: '', trxType: '', description: '', status: '', ok: '', acknowledgement: '' },
    { selection: '', trxNumber: '', trxType: '', description: '', status: '', ok: '', acknowledgement: '' },
    { selection: '', trxNumber: '', trxType: '', description: '', status: '', ok: '', acknowledgement: '' },
    { selection: '', trxNumber: '', trxType: '', description: '', status: '', ok: '', acknowledgement: '' },
    { selection: '', trxNumber: '', trxType: '', description: '', status: '', ok: '', acknowledgement: '' },
    { selection: '', trxNumber: '', trxType: '', description: '', status: '', ok: '', acknowledgement: '' },
    { selection: '', trxNumber: '', trxType: '', description: '', status: '', ok: '', acknowledgement: '' },
    { selection: '', trxNumber: '', trxType: '', description: '', status: '', ok: '', acknowledgement: '' }
  ];

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

