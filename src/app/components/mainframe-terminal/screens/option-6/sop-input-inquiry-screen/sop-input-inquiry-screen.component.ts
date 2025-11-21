import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MainframeScreen } from '../../../../../models/mainframe-screen.model';

@Component({
  selector: 'app-sop-input-inquiry-screen',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './sop-input-inquiry-screen.component.html',
  styleUrls: ['./sop-input-inquiry-screen.component.css']
})
export class SopInputInquiryScreenComponent {
  @Input() screen: MainframeScreen | null = null;
}
