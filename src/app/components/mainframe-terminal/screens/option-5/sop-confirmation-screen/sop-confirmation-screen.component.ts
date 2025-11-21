import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MainframeScreen } from '../../../../../models/mainframe-screen.model';

@Component({
  selector: 'app-sop-confirmation-screen',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './sop-confirmation-screen.component.html',
  styleUrls: ['./sop-confirmation-screen.component.css']
})
export class SopConfirmationScreenComponent {
  @Input() screen: MainframeScreen | null = null;

  sopNumber: string = '00053575';
  letterPrinterId: string = 'S T891';
  letterAddress: string = '301 W PRESTON ST / 8TH FLOOR /';
  filmLabelPrinterId: string = 'S T877';

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

