import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { MainframeScreenService } from '../../services/mainframe-screen.service';
import { MainframeScreen, FieldDefinition, FieldType } from '../../models/mainframe-screen.model';

@Component({
  selector: 'app-mainframe-terminal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './mainframe-terminal.component.html',
  styleUrls: ['./mainframe-terminal.component.css']
})
export class MainframeTerminalComponent implements OnInit, OnDestroy {
  currentScreen: MainframeScreen | null = null;
  private destroy$ = new Subject<void>();
  private currentTime = new Date();
  private timeInterval: any;

  // Expose FieldType enum to template
  FieldType = FieldType;

  constructor(private screenService: MainframeScreenService) {}

  ngOnInit(): void {
    // Subscribe to current screen changes
    this.screenService.getCurrentScreen()
      .pipe(takeUntil(this.destroy$))
      .subscribe(screen => {
        this.currentScreen = screen;
      });

    // Load initial screen
    this.screenService.navigateToScreen('SS6T-6');

    // Update time every second
    this.timeInterval = setInterval(() => {
      this.currentTime = new Date();
      if (this.currentScreen) {
        this.currentScreen.header.time = this.screenService.formatTime(this.currentTime);
      }
    }, 1000);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    if (this.timeInterval) {
      clearInterval(this.timeInterval);
    }
  }

  /**
   * Handle keyboard events for PF keys and navigation
   */
  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent): void {
    // Handle F1-F12 keys
    if (event.key.startsWith('F')) {
      const keyNumber = parseInt(event.key.substring(1), 10);
      if (keyNumber >= 1 && keyNumber <= 12) {
        event.preventDefault();
        this.screenService.handlePFKey(keyNumber);
      }
    }

    // Handle Escape key as END
    if (event.key === 'Escape') {
      event.preventDefault();
      this.screenService.handlePFKey(3); // F3 = END
    }
  }

  /**
   * Get field value with padding
   */
  getFieldDisplay(field: FieldDefinition): string {
    const padChar = field.padChar || '_';
    const value = field.value || '';
    const padding = padChar.repeat(Math.max(0, field.length - value.length));
    return value + padding;
  }

  /**
   * Handle field value change
   */
  onFieldChange(field: FieldDefinition, event: any): void {
    let value = event.target.value;
    
    // Enforce uppercase for mainframe authenticity
    value = value.toUpperCase();
    
    // Enforce max length
    value = value.substring(0, field.length);
    
    this.screenService.updateFieldValue(field.id, value);
  }

  /**
   * Get field position style
   */
  getFieldStyle(field: FieldDefinition): any {
    return {
      'grid-row': field.row,
      'grid-column': `${field.col} / span ${field.length}`,
      'color': field.color || '#00FF00'
    };
  }

  /**
   * Get label position style
   */
  getLabelStyle(field: FieldDefinition): any {
    const col = field.labelCol || field.col - (field.label?.length || 0) - 1;
    return {
      'grid-row': field.row,
      'grid-column': `${col} / span ${field.label?.length || 0}`,
      'color': field.color || '#00FF00'
    };
  }

  /**
   * Check if field is editable
   */
  isEditable(field: FieldDefinition): boolean {
    return field.type === FieldType.INPUT;
  }

  /**
   * Format PF key display
   */
  formatPFKey(pfKey: any): string {
    return `PF: ${pfKey.label}`;
  }

  /**
   * Get menu items display
   */
  getMenuDisplay(): string {
    if (!this.currentScreen?.header.menuItems) return '';
    return this.currentScreen.header.menuItems.join('   ');
  }

  /**
   * Get page display
   */
  getPageDisplay(): string {
    if (!this.currentScreen?.header.pageNumber) return '';
    return `Page ${this.currentScreen.header.pageNumber.toString().padStart(4)} of ${this.currentScreen.header.totalPages}`;
  }

  /**
   * Generate grid rows based on screen size (default 24 rows for mainframe)
   */
  get gridRows(): string {
    return 'repeat(24, 1fr)';
  }

  /**
   * Generate grid columns (80 columns standard mainframe width)
   */
  get gridColumns(): string {
    return 'repeat(80, 1ch)';
  }
}

