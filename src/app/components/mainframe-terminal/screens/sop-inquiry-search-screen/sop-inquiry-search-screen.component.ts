import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MainframeScreen } from '../../../../models/mainframe-screen.model';

@Component({
  selector: 'app-sop-inquiry-search-screen',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './sop-inquiry-search-screen.component.html',
  styleUrls: ['./sop-inquiry-search-screen.component.css']
})
export class SopInquirySearchScreenComponent {
  @Input() screen: MainframeScreen | null = null;
  pageNumber: number = 1;
  totalPages: number = 1;
}
