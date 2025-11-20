import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MainframeScreen } from '../../../../models/mainframe-screen.model';

@Component({
  selector: 'app-work-order-transaction-screen',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './work-order-transaction-screen.component.html',
  styleUrls: ['./work-order-transaction-screen.component.css']
})
export class WorkOrderTransactionScreenComponent {
  @Input() screen: MainframeScreen | null = null;

  transactionType: string = '';
  description: string = 'TEST_DESC_ADI';
  baseFee: string = '0.00';
  numberOfPagesFiled: string = '';
  excessFee: string = '0.00';
  amountPaid: string = '0.00';
  orgAndCapFee: string = '0.00';
  expediteFee: string = '0.00';
  postageFee: string = '0.00';
  penalty: string = '0.00';
  stateRecordationTax: string = '0.00';
  serviceFee: string = '0.00';
  stateTransferTax: string = '0.00';
  numberOfPlainCopies: string = '';
  numberOfCertifiedCopies: string = '';
  copyFee: string = '0.00';
  expedited: string = '';
  noFeeTransaction: string = '';

  getCurrentDate(): string {
    const now = new Date();
    return now.toISOString().split('T')[0];
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

