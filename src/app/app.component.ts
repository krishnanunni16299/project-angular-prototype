import { Component } from '@angular/core';
import { MainframeTerminalComponent } from './components/mainframe-terminal/mainframe-terminal.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MainframeTerminalComponent],
  template: `<app-mainframe-terminal></app-mainframe-terminal>`,
  styles: []
})
export class AppComponent {
  title = 'Mainframe Terminal';
}

