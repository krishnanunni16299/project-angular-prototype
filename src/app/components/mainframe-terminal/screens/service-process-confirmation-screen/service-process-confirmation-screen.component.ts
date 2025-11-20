import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MainframeScreen } from '../../../../models/mainframe-screen.model';

@Component({
  selector: 'app-service-process-confirmation-screen',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './service-process-confirmation-screen.component.html',
  styleUrls: ['./service-process-confirmation-screen.component.css']
})
export class ServiceProcessConfirmationScreenComponent implements OnInit {
  @Input() screen: MainframeScreen | null = null;

  sopNumber: string = '';
  
  // Printer selections
  letterPrinterSelection: string = '';
  letterPrinterId: string = ' T891';
  letterPrinterAddress1: string = '301 N PRESTON ST / 8TH FLOOR /';
  letterPrinterAddress2: string = '';
  
  filmLabelPrinterSelection: string = '';
  filmLabelPrinterId: string = ' T877';
  filmLabelPrinterAddress1: string = '301 N PRESTON ST / 8TH FLOOR /';
  filmLabelPrinterAddress2: string = '';

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

