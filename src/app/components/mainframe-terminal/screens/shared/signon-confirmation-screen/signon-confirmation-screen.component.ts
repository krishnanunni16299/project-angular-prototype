import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MainframeScreen } from '../../../../../models/mainframe-screen.model';

@Component({
  selector: 'app-signon-confirmation-screen',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './signon-confirmation-screen.component.html',
  styleUrls: ['./signon-confirmation-screen.component.css']
})
export class SignonConfirmationScreenComponent {
  @Input() screen: MainframeScreen | null = null;

  command: string = '';
}

