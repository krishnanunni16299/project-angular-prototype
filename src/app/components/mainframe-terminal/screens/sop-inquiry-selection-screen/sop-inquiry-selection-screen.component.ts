import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MainframeScreen } from '../../../../models/mainframe-screen.model';

@Component({
  selector: 'app-sop-inquiry-selection-screen',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './sop-inquiry-selection-screen.component.html',
  styleUrls: ['./sop-inquiry-selection-screen.component.css']
})
export class SopInquirySelectionScreenComponent {
  @Input() screen: MainframeScreen | null = null;
}
