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
    this.registerScreen(this.getCustomerInformationScreen());
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
}

