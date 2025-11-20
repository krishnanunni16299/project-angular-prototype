import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MainframeScreen } from '../../../../models/mainframe-screen.model';

@Component({
  selector: 'app-confirm-work-order-screen',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './confirm-work-order-screen.component.html',
  styleUrls: ['./confirm-work-order-screen.component.css']
})
export class ConfirmWorkOrderScreenComponent {
  @Input() screen: MainframeScreen | null = null;

  // Form fields
  receivedDateMonth: string = '';
  receivedDateDay: string = '';
  receivedDateYear: string = '';
  recountNumber: string = '';

  getCurrentDate(): string {
    const now = new Date();
    return now.toISOString().split('T')[0];
  }

  getCurrentTime(): string {
    const now = new Date();
    return now.toTimeString().split(' ')[0].substring(0, 8);
  }
}

