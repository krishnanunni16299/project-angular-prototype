import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MainframeScreen } from '../../../../models/mainframe-screen.model';

@Component({
  selector: 'app-work-order-slip-printing-screen',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './work-order-slip-printing-screen.component.html',
  styleUrls: ['./work-order-slip-printing-screen.component.css']
})
export class WorkOrderSlipPrintingScreenComponent {
  @Input() screen: MainframeScreen | null = null;

  // Display values
  workOrderNumber: string = '0005252111';
  customerId: string = '0004035537';
  
  // Form fields
  printSelection: string = '';
  checkEndorsementCount: string = '00';
  workOrderLabelCount: string = '00';
  printerId: string = 'T877_301_W_PRESTON_ST_/_8TH_FLOOR_/';
  printerLabel: string = 'LABEL___';

  getCurrentDate(): string {
    const now = new Date();
    return now.toISOString().split('T')[0];
  }

  getCurrentTime(): string {
    const now = new Date();
    return now.toTimeString().split(' ')[0].substring(0, 8);
  }
}

