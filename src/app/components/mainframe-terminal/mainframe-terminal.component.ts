import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { MainframeScreenService } from '../../services/mainframe-screen.service';
import { MainframeScreen, FieldDefinition, FieldType } from '../../models/mainframe-screen.model';
import { WelcomeScreenComponent } from './screens/welcome-screen/welcome-screen.component';
import { CustomerInfoScreenComponent } from './screens/customer-info-screen/customer-info-screen.component';
import { LoginScreenComponent } from './screens/login-screen/login-screen.component';
import { SignonConfirmationScreenComponent } from './screens/signon-confirmation-screen/signon-confirmation-screen.component';
import { MenuScreenComponent } from './screens/menu-screen/menu-screen.component';
import { WorkOrderTransactionScreenComponent } from './screens/work-order-transaction-screen/work-order-transaction-screen.component';
import { WorkOrderBalanceScreenComponent } from './screens/work-order-balance-screen/work-order-balance-screen.component';
import { WorkOrderReceiptsScreenComponent } from './screens/work-order-receipts-screen/work-order-receipts-screen.component';
import { ConfirmWorkOrderScreenComponent } from './screens/confirm-work-order-screen/confirm-work-order-screen.component';
import { WorkOrderSlipPrintingScreenComponent } from './screens/work-order-slip-printing-screen/work-order-slip-printing-screen.component';
import { ProcessWorkOrderScreenComponent } from './screens/process-work-order-screen/process-work-order-screen.component';
import { WorkOrderTransactionAltScreenComponent } from './screens/work-order-transaction-alt-screen/work-order-transaction-alt-screen.component';
import { ServiceOfProcessScreenComponent } from './screens/service-of-process-screen/service-of-process-screen.component';
import { ServiceProcessConfirmationScreenComponent } from './screens/service-process-confirmation-screen/service-process-confirmation-screen.component';
import { SopMaintenanceSelectionScreenComponent } from './screens/sop-maintenance-selection-screen/sop-maintenance-selection-screen.component';

@Component({
  selector: 'app-mainframe-terminal',
  standalone: true,
  imports: [CommonModule, FormsModule, WelcomeScreenComponent, CustomerInfoScreenComponent, LoginScreenComponent, SignonConfirmationScreenComponent, MenuScreenComponent, WorkOrderTransactionScreenComponent, WorkOrderBalanceScreenComponent, WorkOrderReceiptsScreenComponent, ConfirmWorkOrderScreenComponent, WorkOrderSlipPrintingScreenComponent, ProcessWorkOrderScreenComponent, WorkOrderTransactionAltScreenComponent, ServiceOfProcessScreenComponent, ServiceProcessConfirmationScreenComponent, SopMaintenanceSelectionScreenComponent],
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

  constructor(private screenService: MainframeScreenService) { }

  ngOnInit(): void {
    // Subscribe to current screen changes
    this.screenService.getCurrentScreen()
      .pipe(takeUntil(this.destroy$))
      .subscribe(screen => {
        this.currentScreen = screen;
      });

    // Load initial screen (will be set to WELCOME in constructor)
    // this.screenService.navigateToScreen('SS6T-6');

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

        // Navigate from welcome screen to customer info
        if (keyNumber === 1 && this.currentScreen?.screenId === 'WELCOME') {
          this.screenService.navigateToScreen('SS6T-6');
        } else {
          this.screenService.handlePFKey(keyNumber);
        }
      }
    }

    // Handle Escape key as END
    if (event.key === 'Escape') {
      event.preventDefault();
      this.screenService.handlePFKey(3); // F3 = END
    }

    // Handle Enter key on welcome screen
    if (event.key === 'Enter' && this.currentScreen?.screenId === 'WELCOME') {
      event.preventDefault();
      this.screenService.navigateToScreen('SS6T-6');
    }
  }

  /**
   * Get field value without padding (for input display)
   */
  getFieldValue(field: FieldDefinition): string {
    return (field.value || '').trim();
  }

  /**
   * Get padding width in characters
   */
  getPaddingLength(field: FieldDefinition): number {
    const value = (field.value || '').trim();
    return Math.max(0, field.length - value.length);
  }

  /**
   * Get field by ID
   */
  getFieldById(id: string): FieldDefinition | undefined {
    return this.currentScreen?.fields.find(field => field.id === id);
  }

  /**
   * Truncate text to 80 characters (mainframe line limit)
   */
  truncateTo80(text: string): string {
    return text.substring(0, 80);
  }

  /**
   * Pad text to specific length with spaces
   */
  padText(text: string, length: number): string {
    return text.padEnd(length, ' ').substring(0, length);
  }

  /**
   * Format line to exactly 80 characters
   */
  formatLine(text: string): string {
    return this.padText(text, 80);
  }

  /**
   * Handle field value change
   * Enforces mainframe character limits
   */
  onFieldChange(field: FieldDefinition, event: any): void {
    let value = event.target.value.trim();

    // Enforce uppercase for mainframe authenticity
    value = value.toUpperCase();

    // Enforce field max length (part of 80-character line limit)
    value = value.substring(0, field.length);

    // Ensure single-byte characters only (mainframe limitation)
    value = value.replace(/[^\x00-\x7F]/g, '');

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

  /**
   * Navigate to a specific screen (for development/testing)
   * Available screens:
   * - 'WELCOME' - Welcome screen with ASCII art
   * - 'LOGIN' - Login screen
   * - 'SIGNON_CONFIRMATION' - Signon confirmation screen
   * - 'MENU' - MBES Management Menu
   * - 'WORK_ORDER_TRANSACTION' - Create Work Order Transaction (Option 1)
   * - 'WORK_ORDER_TRANSACTION_ALT' - Create Work Order Transaction (No Postage Fee) (Option 1)
   * - 'WORK_ORDER_BALANCE' - Work Order Balance/Payment Tracking (Option 1)
   * - 'WORK_ORDER_RECEIPTS' - Work Order Receipts (Option 1)
   * - 'CONFIRM_WORK_ORDER' - Confirm Work Order Acceptance (Option 1)
   * - 'WORK_ORDER_SLIP_PRINTING' - Work Order Slip Printing (Option 1)
   * - 'PROCESS_WORK_ORDER' - Process Work Order Transactions (Option 1)
   * - 'SERVICE_OF_PROCESS' - Service of Process - Acknowledgement (Option 1)
   * - 'SERVICE_PROCESS_CONFIRMATION' - Service of Process - Confirmation (Option 1)
   * - 'SOP_MAINTENANCE_SELECTION' - SOP Maintenance Selection (Option 4)
   * - 'SS6T-6' - Customer Information screen
   */
  navigateTo(screenId: string): void {
    this.screenService.navigateToScreen(screenId);
  }

  /**
   * Go back to the previous screen
   */
  goBack(): void {
    this.screenService.goBack();
  }
}

