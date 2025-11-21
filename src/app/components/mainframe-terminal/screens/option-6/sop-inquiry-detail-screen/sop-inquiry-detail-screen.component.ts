import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MainframeScreen } from '../../../../../models/mainframe-screen.model';

@Component({
  selector: 'app-sop-inquiry-detail-screen',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './sop-inquiry-detail-screen.component.html',
  styleUrls: ['./sop-inquiry-detail-screen.component.css']
})
export class SopInquiryDetailScreenComponent {
  @Input() screen: MainframeScreen | null = null;
}
