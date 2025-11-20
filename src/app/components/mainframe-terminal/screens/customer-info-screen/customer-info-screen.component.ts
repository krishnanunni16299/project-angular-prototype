import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MainframeScreen } from '../../../../models/mainframe-screen.model';
import { MainframeTerminalComponent } from '../../mainframe-terminal.component';

@Component({
  selector: 'app-customer-info-screen',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './customer-info-screen.component.html',
  styleUrls: ['./customer-info-screen.component.css']
})
export class CustomerInfoScreenComponent {
  @Input() screen: MainframeScreen | null = null;
  @Input() parent!: MainframeTerminalComponent;

  // Proxy methods to parent component
  get getMenuDisplay() {
    return this.parent?.getMenuDisplay.bind(this.parent);
  }

  get getPageDisplay() {
    return this.parent?.getPageDisplay.bind(this.parent);
  }

  get getFieldValue() {
    return this.parent?.getFieldValue.bind(this.parent);
  }

  get getFieldById() {
    return this.parent?.getFieldById.bind(this.parent);
  }

  get onFieldChange() {
    return this.parent?.onFieldChange.bind(this.parent);
  }
  get pfKeys() {
    return this.screen?.footer.pfKeys;
  }
}
