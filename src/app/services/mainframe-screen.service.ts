import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MainframeScreen, NavigationEvent, FieldDefinition, ValidationResult } from '../models/mainframe-screen.model';

/**
 * Service for managing mainframe screen data and navigation
 */
@Injectable({
  providedIn: 'root'
})
export class MainframeScreenService {
  private currentScreen$ = new BehaviorSubject<MainframeScreen | null>(null);
  private screenHistory: string[] = [];
  private screens: Map<string, MainframeScreen> = new Map();

  constructor() {
    // Initialize with default screens
    this.registerScreen(this.getLoginScreen());
    this.registerScreen(this.getSignonConfirmationScreen());
    this.registerScreen(this.getMenuScreen());
    this.registerScreen(this.getWorkOrderTransactionScreen());
    this.registerScreen(this.getWorkOrderTransactionAltScreen());
    this.registerScreen(this.getWorkOrderBalanceScreen());
    this.registerScreen(this.getWorkOrderReceiptsScreen());
    this.registerScreen(this.getConfirmWorkOrderScreen());
    this.registerScreen(this.getWorkOrderSlipPrintingScreen());
    this.registerScreen(this.getProcessWorkOrderScreen());
    this.registerScreen(this.getServiceOfProcessScreen());
    this.registerScreen(this.getServiceProcessConfirmationScreen());
    this.registerScreen(this.getSopMaintenanceSelectionScreen());
    this.registerScreen(this.getSopFileMaintenanceScreen());
    this.registerScreen(this.getSopAmendmentEntryScreen());
    this.registerScreen(this.getSopConfirmationScreen());
    this.registerScreen(this.getSopAffidavitPrintingScreen());
    this.registerScreen(this.getSopStandaloneLetterScreen());
    this.registerScreen(this.getWelcomeScreen());
    this.registerScreen(this.getCustomerInformationScreen());
    // Set initial screen - change this to test different screens
    this.navigateToScreen('SOP_FILE_MAINTENANCE'); // Change to: LOGIN, SIGNON_CONFIRMATION, MENU, WORK_ORDER_TRANSACTION, WORK_ORDER_TRANSACTION_ALT, WORK_ORDER_BALANCE, WORK_ORDER_RECEIPTS, CONFIRM_WORK_ORDER, WORK_ORDER_SLIP_PRINTING, PROCESS_WORK_ORDER, SERVICE_OF_PROCESS, SERVICE_PROCESS_CONFIRMATION, SOP_MAINTENANCE_SELECTION, SOP_FILE_MAINTENANCE, SOP_AMENDMENT_ENTRY, or SS6T-6
  }

  /**
   * Register a new screen definition
   */
  registerScreen(screen: MainframeScreen): void {
    this.screens.set(screen.screenId, screen);
  }

  /**
   * Navigate to a specific screen
   */
  navigateToScreen(screenId: string): void {
    const screen = this.screens.get(screenId);
    if (screen) {
      if (this.currentScreen$.value) {
        this.screenHistory.push(this.currentScreen$.value.screenId);
      }
      this.currentScreen$.next(screen);
    } else {
      console.error(`Screen ${screenId} not found`);
    }
  }

  /**
   * Get current screen as observable
   */
  getCurrentScreen(): Observable<MainframeScreen | null> {
    return this.currentScreen$.asObservable();
  }

  /**
   * Get current screen value
   */
  getCurrentScreenValue(): MainframeScreen | null {
    return this.currentScreen$.value;
  }

  /**
   * Go back to previous screen
   */
  goBack(): void {
    const previousScreenId = this.screenHistory.pop();
    if (previousScreenId) {
      const screen = this.screens.get(previousScreenId);
      if (screen) {
        this.currentScreen$.next(screen);
      }
    }
  }

  /**
   * Update a field value
   */
  updateFieldValue(fieldId: string, value: string): void {
    const currentScreen = this.currentScreen$.value;
    if (currentScreen) {
      const field = currentScreen.fields.find(f => f.id === fieldId);
      if (field) {
        // Enforce max length
        field.value = value.substring(0, field.length);
        this.currentScreen$.next({ ...currentScreen });
      }
    }
  }

  /**
   * Validate a field
   */
  validateField(fieldId: string): ValidationResult {
    const currentScreen = this.currentScreen$.value;
    if (!currentScreen) {
      return { isValid: false, fieldId, errorMessage: 'No screen loaded' };
    }

    const field = currentScreen.fields.find(f => f.id === fieldId);
    if (!field) {
      return { isValid: false, fieldId, errorMessage: 'Field not found' };
    }

    // Add custom validation logic here
    // For now, just check if required fields have values
    if (field.value.trim().length === 0) {
      return { isValid: false, fieldId, errorMessage: 'Field is required' };
    }

    return { isValid: true, fieldId };
  }

  /**
   * Handle PF key press
   */
  handlePFKey(keyNumber: number): void {
    const currentScreen = this.currentScreen$.value;
    if (!currentScreen) return;

    const pfKey = currentScreen.footer.pfKeys.find(key => key.key === keyNumber);
    if (pfKey && pfKey.enabled) {
      console.log(`PF${keyNumber} pressed: ${pfKey.action}`);

      // Handle common actions
      switch (pfKey.action) {
        case 'HELP':
          // Show help
          break;
        case 'END':
          // End/Exit
          this.goBack();
          break;
        case 'NEXT':
          // Go to next screen
          break;
        default:
          // Custom action handling
          break;
      }
    }
  }

  /**
   * Format date for mainframe display
   */
  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  /**
   * Format time for mainframe display
   */
  formatTime(date: Date): string {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  }

  /**
   * Login/Signon Screen
   */
  private getLoginScreen(): MainframeScreen {
    const now = new Date();
    return {
      screenId: 'LOGIN',
      title: 'System Signon',
      docType: '',
      header: {
        systemId: 'C1CST21',
        menuItems: [],
        date: now.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).toUpperCase(),
        time: now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }),
        transactionId: 'NFBF',
        receivedType: 'ADTNFBF',
        pageNumber: 0,
        totalPages: 0,
        balance: 'THURSDAY'
      },
      fields: [],
      footer: {
        pfKeys: []
      }
    };
  }

  /**
   * Signon Confirmation Screen (Post-Login)
   */
  private getSignonConfirmationScreen(): MainframeScreen {
    return {
      screenId: 'SIGNON_CONFIRMATION',
      title: 'Signon Confirmation',
      docType: '',
      header: {
        systemId: '',
        menuItems: [],
        date: '',
        time: '',
        transactionId: '',
        receivedType: '',
        pageNumber: 0,
        totalPages: 0,
        balance: ''
      },
      fields: [],
      footer: {
        pfKeys: []
      }
    };
  }

  /**
   * MBES Management Menu Screen
   */
  private getMenuScreen(): MainframeScreen {
    const now = new Date();
    return {
      screenId: 'MENU',
      title: 'MBES Management Menu',
      docType: '',
      header: {
        systemId: 'SS00-1',
        menuItems: [],
        date: now.toISOString().split('T')[0],
        time: now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }),
        transactionId: 'T21',
        receivedType: '',
        pageNumber: 0,
        totalPages: 0,
        balance: ''
      },
      fields: [],
      footer: {
        pfKeys: [
          { key: 1, label: '1-HELP', action: '', enabled: true },
          { key: 3, label: '3-END', action: '', enabled: true }
        ]
      }
    };
  }

  /**
   * CREATE WORK ORDER TRANSACTION Screen
   */
  private getWorkOrderTransactionScreen(): MainframeScreen {
    const now = new Date();
    return {
      screenId: 'WORK_ORDER_TRANSACTION',
      title: 'Create Work Order Transaction',
      docType: '',
      header: {
        systemId: 'SS21-C',
        menuItems: [],
        date: now.toISOString().split('T')[0],
        time: now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }),
        transactionId: 'T21',
        receivedType: '',
        pageNumber: 1,
        totalPages: 1,
        balance: ''
      },
      fields: [],
      footer: {
        pfKeys: [
          { key: 1, label: '1-HELP', action: '', enabled: true },
          { key: 2, label: '2-COMMENTS', action: '', enabled: true },
          { key: 3, label: '3-END', action: '', enabled: true },
          { key: 4, label: '4-COUNTY TAX', action: '', enabled: true },
          { key: 8, label: '8-FWD', action: '', enabled: true },
          { key: 9, label: '9-DEL', action: '', enabled: true },
          { key: 10, label: '10-PRV', action: '', enabled: true },
          { key: 11, label: '11-NXT', action: '', enabled: true }
        ]
      }
    };
  }

  private getWorkOrderTransactionAltScreen(): MainframeScreen {
    const now = new Date();
    return {
      screenId: 'WORK_ORDER_TRANSACTION_ALT',
      title: 'Create Work Order Transaction (No Postage)',
      docType: '',
      header: {
        systemId: 'SS21-C',
        menuItems: [],
        date: now.toISOString().split('T')[0],
        time: now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }),
        transactionId: 'T21',
        receivedType: '',
        pageNumber: 1,
        totalPages: 1,
        balance: ''
      },
      fields: [],
      footer: {
        pfKeys: [
          { key: 1, label: '1-HELP', action: '', enabled: true },
          { key: 2, label: '2-COMMENTS', action: '', enabled: true },
          { key: 3, label: '3-END', action: '', enabled: true },
          { key: 4, label: '4-COUNTY TAX', action: '', enabled: true },
          { key: 8, label: '8-FWD', action: '', enabled: true },
          { key: 9, label: '9-DEL', action: '', enabled: true },
          { key: 10, label: '10-PRV', action: '', enabled: true },
          { key: 11, label: '11-NXT', action: '', enabled: true }
        ]
      }
    };
  }

  /**
   * Welcome/Warning Screen
   */
  private getWelcomeScreen(): MainframeScreen {
    return {
      screenId: 'WELCOME',
      title: 'System Access Warning',
      docType: '',
      header: {
        systemId: 'COMMAND UNRECOGNIZED',
        menuItems: [],
        date: '',
        time: '',
        transactionId: '',
        receivedType: 'ANNAPOLIS DATA CENTER',
        pageNumber: 0,
        totalPages: 0,
        balance: 'USSTAB: USSTALL'
      },
      fields: [],
      footer: {
        pfKeys: [
          { key: 1, label: '1-CONTINUE', action: 'navigate:SS6T-6', enabled: true }
        ]
      }
    };
  }

  /**
   * Example screen: Customer Information (SS6T-6)
   */
  private getCustomerInformationScreen(): MainframeScreen {
    const now = new Date();

    return {
      screenId: 'SS6T-6',
      title: 'Customer Information',
      docType: 'C',
      header: {
        systemId: 'SS6T-6',
        menuItems: ['M', 'B', 'E', 'S'],
        date: this.formatDate(now),
        time: this.formatTime(now),
        transactionId: 'T21',
        receivedType: 'Received Type: C  (C-counter,F-fax,M-mail,N-NIC,I-COS/Inter)',
        pageNumber: 1,
        totalPages: 1,
        balance: '0.00'
      },
      fields: [
        {
          id: 'custDeptId',
          row: 4,
          col: 16,
          label: 'Cust/DeptID:',
          labelCol: 1,
          value: '',
          length: 10,
          type: 'INPUT' as any,
          tabIndex: 1
        },
        {
          id: 'mailCode',
          row: 6,
          col: 65,
          label: 'MAIL CODE:',
          labelCol: 52,
          value: '',
          length: 15,
          type: 'INPUT' as any,
          tabIndex: 2
        },
        {
          id: 'description',
          row: 7,
          col: 16,
          label: 'Description:',
          labelCol: 1,
          value: '',
          length: 60,
          type: 'INPUT' as any,
          tabIndex: 3
        },
        {
          id: 'fullName',
          row: 8,
          col: 16,
          label: 'Full name:',
          labelCol: 1,
          value: '',
          length: 60,
          type: 'INPUT' as any,
          tabIndex: 4
        },
        {
          id: 'mailToName',
          row: 9,
          col: 16,
          label: 'Mail-To Name:',
          labelCol: 1,
          value: '',
          length: 60,
          type: 'INPUT' as any,
          tabIndex: 5
        },
        {
          id: 'careOfName',
          row: 10,
          col: 16,
          label: 'Care-of Name:',
          labelCol: 1,
          value: '',
          length: 60,
          type: 'INPUT' as any,
          tabIndex: 6
        },
        {
          id: 'street',
          row: 11,
          col: 16,
          label: 'Street:',
          labelCol: 1,
          value: '',
          length: 60,
          type: 'INPUT' as any,
          tabIndex: 7
        },
        {
          id: 'city',
          row: 13,
          col: 6,
          label: 'City:',
          labelCol: 1,
          value: '',
          length: 30,
          type: 'INPUT' as any,
          tabIndex: 8
        },
        {
          id: 'state',
          row: 13,
          col: 42,
          label: 'St:',
          labelCol: 38,
          value: '',
          length: 2,
          type: 'INPUT' as any,
          tabIndex: 9
        },
        {
          id: 'zip',
          row: 13,
          col: 52,
          label: 'ZIP:',
          labelCol: 47,
          value: '',
          length: 10,
          type: 'INPUT' as any,
          tabIndex: 10
        },
        {
          id: 'country',
          row: 14,
          col: 11,
          label: 'Country:',
          labelCol: 1,
          value: '',
          length: 60,
          type: 'INPUT' as any,
          tabIndex: 11
        },
        {
          id: 'telephone',
          row: 15,
          col: 12,
          label: 'Telephone:',
          labelCol: 1,
          value: '111-222-3333',
          length: 25,
          type: 'INPUT' as any,
          tabIndex: 12
        },
        {
          id: 'fax',
          row: 15,
          col: 48,
          label: 'Fax:',
          labelCol: 43,
          value: '',
          length: 15,
          type: 'INPUT' as any,
          tabIndex: 13
        },
        {
          id: 'email',
          row: 16,
          col: 10,
          label: 'e-mail:',
          labelCol: 1,
          value: '',
          length: 60,
          type: 'INPUT' as any,
          tabIndex: 14
        },
        {
          id: 'mailCode',
          row: 16,
          col: 65,
          label: 'MAIL Code:',
          labelCol: 1,
          value: '',
          length: 15,
          type: 'INPUT' as any,
          tabIndex: 15
        }
      ],
      footer: {
        pfKeys: [
          { key: 1, label: '1-HELP', action: 'HELP', enabled: true },
          { key: 3, label: '3-END', action: 'END', enabled: true },
          { key: 11, label: '11-NXT', action: 'NEXT', enabled: true }
        ]
      }
    };
  }

  /**
   * Get Work Order Balance Screen definition
   */
  private getWorkOrderBalanceScreen(): MainframeScreen {
    const now = new Date();
    return {
      screenId: 'WORK_ORDER_BALANCE',
      title: 'Create Work Order Transaction - Balance',
      docType: '',
      header: {
        systemId: 'SS7P-1',
        menuItems: [],
        date: now.toISOString().split('T')[0],
        time: now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }),
        transactionId: 'T21',
        receivedType: '',
        pageNumber: 1,
        totalPages: 1,
        balance: ''
      },
      fields: [],
      footer: {
        pfKeys: [
          { key: 1, label: '1-HELP', action: 'HELP', enabled: true },
          { key: 3, label: '3-END', action: 'END', enabled: true },
          { key: 8, label: '8-FWD', action: 'FORWARD', enabled: true },
          { key: 10, label: '10-PRV', action: 'PREVIOUS', enabled: true },
          { key: 11, label: '11-NXT', action: 'NEXT', enabled: true }
        ]
      }
    };
  }

  /**
   * Get Work Order Receipts Screen definition
   */
  private getWorkOrderReceiptsScreen(): MainframeScreen {
    const now = new Date();
    return {
      screenId: 'WORK_ORDER_RECEIPTS',
      title: 'Work Order Receipts',
      docType: '',
      header: {
        systemId: 'SS7P-1',
        menuItems: [],
        date: now.toISOString().split('T')[0],
        time: now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }),
        transactionId: 'T21',
        receivedType: '',
        pageNumber: 1,
        totalPages: 1,
        balance: ''
      },
      fields: [],
      footer: {
        pfKeys: [
          { key: 1, label: '1-HELP', action: 'HELP', enabled: true },
          { key: 3, label: '3-END', action: 'END', enabled: true },
          { key: 8, label: '8-FWD', action: 'FORWARD', enabled: true },
          { key: 10, label: '10-PRV', action: 'PREVIOUS', enabled: true },
          { key: 11, label: '11-NXT', action: 'NEXT', enabled: true }
        ]
      }
    };
  }

  /**
   * Get Confirm Work Order Screen definition
   */
  private getConfirmWorkOrderScreen(): MainframeScreen {
    const now = new Date();
    return {
      screenId: 'CONFIRM_WORK_ORDER',
      title: 'Confirm Work Order Acceptance',
      docType: '',
      header: {
        systemId: 'SS3A-1',
        menuItems: [],
        date: now.toISOString().split('T')[0],
        time: now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }),
        transactionId: 'T21',
        receivedType: '',
        pageNumber: 0,
        totalPages: 0,
        balance: ''
      },
      fields: [],
      footer: {
        pfKeys: [
          { key: 1, label: '1-HELP', action: 'HELP', enabled: true },
          { key: 3, label: '3-END', action: 'END', enabled: true },
          { key: 6, label: '6-CONFIRM', action: 'CONFIRM', enabled: true },
          { key: 10, label: '10-PRV', action: 'PREVIOUS', enabled: true }
        ]
      }
    };
  }

  /**
   * Get Work Order Slip Printing Screen definition
   */
  private getWorkOrderSlipPrintingScreen(): MainframeScreen {
    const now = new Date();
    return {
      screenId: 'WORK_ORDER_SLIP_PRINTING',
      title: 'Work Order Slip Printing',
      docType: '',
      header: {
        systemId: 'SS7D',
        menuItems: [],
        date: now.toISOString().split('T')[0],
        time: now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }),
        transactionId: 'T21',
        receivedType: '',
        pageNumber: 0,
        totalPages: 0,
        balance: ''
      },
      fields: [],
      footer: {
        pfKeys: [
          { key: 1, label: '1-HELP', action: 'HELP', enabled: true },
          { key: 3, label: '3-END', action: 'END', enabled: true },
          { key: 4, label: '4-NEW WORK ORDER', action: 'NEW', enabled: true },
          { key: 10, label: '10-PRV', action: 'PREVIOUS', enabled: true }
        ]
      }
    };
  }

  private getProcessWorkOrderScreen(): MainframeScreen {
    const now = new Date();
    return {
      screenId: 'PROCESS_WORK_ORDER',
      title: 'Process Work Order Transactions',
      docType: '',
      header: {
        systemId: 'SS7H-S',
        menuItems: [],
        date: now.toISOString().split('T')[0],
        time: now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }),
        transactionId: 'T21',
        receivedType: '',
        pageNumber: 1,
        totalPages: 1,
        balance: ''
      },
      fields: [],
      footer: {
        pfKeys: [
          { key: 1, label: '1-HELP', action: 'HELP', enabled: true },
          { key: 3, label: '3-END', action: 'END', enabled: true }
        ]
      }
    };
  }

  private getServiceOfProcessScreen(): MainframeScreen {
    const now = new Date();
    return {
      screenId: 'SERVICE_OF_PROCESS',
      title: 'Service of Process - Acknowledgement',
      docType: '',
      header: {
        systemId: 'SS9H-1',
        menuItems: [],
        date: now.toISOString().split('T')[0],
        time: now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }),
        transactionId: 'T21',
        receivedType: '',
        pageNumber: 0,
        totalPages: 0,
        balance: ''
      },
      fields: [],
      footer: {
        pfKeys: [
          { key: 1, label: '1-HELP', action: 'HELP', enabled: true },
          { key: 3, label: '3-END', action: 'END', enabled: true },
          { key: 8, label: '8-FWD', action: 'FORWARD', enabled: true },
          { key: 11, label: '11-NXT', action: 'NEXT', enabled: true }
        ]
      }
    };
  }

  private getServiceProcessConfirmationScreen(): MainframeScreen {
    const now = new Date();
    return {
      screenId: 'SERVICE_PROCESS_CONFIRMATION',
      title: 'Service of Process - Confirmation',
      docType: '',
      header: {
        systemId: 'SS3A-5',
        menuItems: [],
        date: now.toISOString().split('T')[0],
        time: now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }),
        transactionId: 'T21',
        receivedType: '',
        pageNumber: 0,
        totalPages: 0,
        balance: ''
      },
      fields: [],
      footer: {
        pfKeys: [
          { key: 1, label: '1-HELP', action: 'HELP', enabled: true },
          { key: 3, label: '3-END', action: 'END', enabled: true },
          { key: 4, label: '4-PROCESS WORK ORDER', action: 'PROCESS', enabled: true },
          { key: 6, label: '6-CONFIRM', action: 'CONFIRM', enabled: true },
          { key: 10, label: '10-PRV', action: 'PREVIOUS', enabled: true }
        ]
      }
    };
  }

  private getSopMaintenanceSelectionScreen(): MainframeScreen {
    const now = new Date();
    return {
      screenId: 'SOP_MAINTENANCE_SELECTION',
      title: 'SOP - Maintenance Selection',
      docType: '',
      header: {
        systemId: 'SS9L-2',
        menuItems: [],
        date: now.toISOString().split('T')[0],
        time: now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }),
        transactionId: 'T21',
        receivedType: '',
        pageNumber: 0,
        totalPages: 0,
        balance: ''
      },
      fields: [],
      footer: {
        pfKeys: [
          { key: 1, label: '1-HELP', action: 'HELP', enabled: true },
          { key: 3, label: '3-END', action: 'END', enabled: true },
          { key: 9, label: '9-DEL', action: 'DELETE', enabled: true },
          { key: 11, label: '11-NXT', action: 'NEXT', enabled: true }
        ]
      }
    };
  }

  /**
   * Get SOP File Maintenance Screen definition (Option 4 - Screen 2)
   */
  private getSopFileMaintenanceScreen(): MainframeScreen {
    const now = new Date();
    return {
      screenId: 'SOP_FILE_MAINTENANCE',
      title: 'SERVICE OF PROCESS - FILE MAINTENANCE',
      docType: '',
      header: {
        systemId: 'SS9H-7',
        menuItems: [],
        date: now.toISOString().split('T')[0],
        time: now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }),
        transactionId: 'T21',
        receivedType: '',
        pageNumber: 0,
        totalPages: 0,
        balance: ''
      },
      fields: [],
      footer: {
        pfKeys: [
          { key: 1, label: '1-HELP', action: 'HELP', enabled: true },
          { key: 2, label: '2-COMMENTS', action: 'COMMENTS', enabled: true },
          { key: 3, label: '3-END', action: 'END', enabled: true },
          { key: 8, label: '8-FWD', action: 'FORWARD', enabled: true },
          { key: 9, label: '9-DEL', action: 'DELETE', enabled: true },
          { key: 10, label: '10-PRV', action: 'PREVIOUS', enabled: true },
          { key: 11, label: '11-NXT', action: 'NEXT', enabled: true }
        ]
      }
    };
  }

  /**
   * Get SOP Amendment Entry Screen definition (Option 5 - Screen 1)
   */
  private getSopAmendmentEntryScreen(): MainframeScreen {
    const now = new Date();
    return {
      screenId: 'SOP_AMENDMENT_ENTRY',
      title: 'SERVICE OF PROCESS - AMENDMENT ENTRY',
      docType: '',
      header: {
        systemId: 'SS9H-2',
        menuItems: [],
        date: this.formatDate(now),
        time: this.formatTime(now),
        transactionId: 'T21',
        receivedType: '',
        pageNumber: 0,
        totalPages: 0,
        balance: ''
      },
      fields: [],
      footer: {
        pfKeys: [
          { key: 1, label: '1-HELP', action: 'HELP', enabled: true },
          { key: 2, label: '2-COMMENTS', action: 'COMMENTS', enabled: true },
          { key: 3, label: '3-END', action: 'END', enabled: true },
          { key: 8, label: '8-FWD', action: 'FORWARD', enabled: true },
          { key: 11, label: '11-NXT', action: 'NEXT', enabled: true }
        ]
      }
    };
  }

  /**
   * Get SOP Confirmation Screen definition (Option 5 - Screen 2)
   */
  private getSopConfirmationScreen(): MainframeScreen {
    const now = new Date();
    return {
      screenId: 'SOP_CONFIRMATION',
      title: 'SERVICE OF PROCESS - CONFIRMATION',
      docType: '',
      header: {
        systemId: 'SS3A-S',
        menuItems: [],
        date: this.formatDate(now),
        time: this.formatTime(now),
        transactionId: 'T21',
        receivedType: '',
        pageNumber: 0,
        totalPages: 0,
        balance: ''
      },
      fields: [],
      footer: {
        pfKeys: [
          { key: 1, label: '1-HELP', action: 'HELP', enabled: true },
          { key: 3, label: '3-END', action: 'END', enabled: true },
          { key: 4, label: '4-PROCESS WORK ORDER', action: 'PROCESS_WORK_ORDER', enabled: true },
          { key: 6, label: '6-CONFIRM', action: 'CONFIRM', enabled: true },
          { key: 10, label: '10-PRV', action: 'PREVIOUS', enabled: true }
        ]
      }
    };
  }

  /**
   * Get SOP Affidavit Printing Screen definition (Option 7 - Screen 1)
   */
  private getSopAffidavitPrintingScreen(): MainframeScreen {
    const now = new Date();
    return {
      screenId: 'SOP_AFFIDAVIT_PRINTING',
      title: 'SERVICE OF PROCESS- AFFIDAVIT PRINTING',
      docType: '',
      header: {
        systemId: 'SS9M-1',
        menuItems: [],
        date: this.formatDate(now),
        time: this.formatTime(now),
        transactionId: 'T21',
        receivedType: '',
        pageNumber: 0,
        totalPages: 0,
        balance: ''
      },
      fields: [],
      footer: {
        pfKeys: [
          { key: 1, label: '1-HELP', action: 'HELP', enabled: true },
          { key: 3, label: '3-END', action: 'END', enabled: true },
          { key: 6, label: '6-CONFIRM', action: 'CONFIRM', enabled: true }
        ]
      }
    };
  }

  /**
   * Get SOP Standalone Letter Screen definition (Option 8 - Screen 1)
   */
  private getSopStandaloneLetterScreen(): MainframeScreen {
    const now = new Date();
    return {
      screenId: 'SOP_STANDALONE_LETTER',
      title: 'SERVICE OF PROCESS - STAND ALONE LETTER',
      docType: '',
      header: {
        systemId: 'SS9P-1',
        menuItems: [],
        date: this.formatDate(now),
        time: this.formatTime(now),
        transactionId: 'T21',
        receivedType: '',
        pageNumber: 0,
        totalPages: 0,
        balance: ''
      },
      fields: [],
      footer: {
        pfKeys: [
          { key: 1, label: '1-HELP', action: 'HELP', enabled: true },
          { key: 3, label: '3-END', action: 'END', enabled: true },
          { key: 6, label: '6-CONFIRM', action: 'CONFIRM', enabled: true }
        ]
      }
    };
  }
}

