import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainframeScreen } from '../../../../models/mainframe-screen.model';

@Component({
  selector: 'app-welcome-screen',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './welcome-screen.component.html',
  styleUrls: ['./welcome-screen.component.css']
})
export class WelcomeScreenComponent {
  @Input() screen: MainframeScreen | null = null;
}
