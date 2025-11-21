import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MainframeScreen } from '../../../../../models/mainframe-screen.model';

@Component({
  selector: 'app-work-order-balance-screen',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './work-order-balance-screen.component.html',
  styleUrls: ['./work-order-balance-screen.component.css']
})
export class WorkOrderBalanceScreenComponent {
  @Input() screen: MainframeScreen | null = null;

  // Form fields
  customerId: string = '';
  customerName: string = '';
  controlNumber: string = '';
  
  // Display values
  custIdBalance: string = '-100.00';
  woCharges: string = '-100.00';
  woPayments: string = '0.00';
  woModification: string = '0.00';
  depositId: string = '2026/073__';
  receiptDate: string = '10 16 2025';

  // Payment/Charge entries (left table)
  leftEntries = [
    { type: '', amount: '', tracking: '' },
    { type: '', amount: '', tracking: '' },
    { type: '', amount: '', tracking: '' },
    { type: '', amount: '', tracking: '' },
    { type: '', amount: '', tracking: '' },
    { type: '', amount: '', tracking: '' },
    { type: '', amount: '', tracking: '' },
    { type: '', amount: '', tracking: '' },
    { type: '', amount: '', tracking: '' },
    { type: '', amount: '', tracking: '' }
  ];

  // Payment/Charge entries (right table)
  rightEntries = [
    { type: '', amount: '', tracking: '' },
    { type: '', amount: '', tracking: '' },
    { type: '', amount: '', tracking: '' },
    { type: '', amount: '', tracking: '' },
    { type: '', amount: '', tracking: '' },
    { type: '', amount: '', tracking: '' },
    { type: '', amount: '', tracking: '' },
    { type: '', amount: '', tracking: '' },
    { type: '', amount: '', tracking: '' },
    { type: '', amount: '', tracking: '' }
  ];

  getCurrentDate(): string {
    const now = new Date();
    return now.toISOString().split('T')[0];
  }

  getCurrentTime(): string {
    const now = new Date();
    return now.toTimeString().split(' ')[0].substring(0, 8);
  }
}

