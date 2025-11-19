/**
 * Example mainframe screen definitions
 * Use these as templates for creating your own screens
 */

import { MainframeScreen, FieldType } from '../models/mainframe-screen.model';

/**
 * Example: Invoice Entry Screen
 */
export function getInvoiceScreen(): MainframeScreen {
  const now = new Date();
  
  return {
    screenId: 'INV-001',
    title: 'Invoice Entry',
    header: {
      systemId: 'INV-001',
      menuItems: ['M', 'B', 'E', 'S'],
      date: formatDate(now),
      time: formatTime(now),
      transactionId: 'T30',
      receivedType: 'Invoice Type: R (R-regular, C-credit, D-debit)',
      pageNumber: 1,
      totalPages: 1,
      balance: '0.00'
    },
    fields: [
      {
        id: 'invoiceNumber',
        row: 7,
        col: 20,
        label: 'Invoice Number:',
        labelCol: 1,
        value: '',
        length: 15,
        type: FieldType.INPUT,
        tabIndex: 1
      },
      {
        id: 'invoiceDate',
        row: 8,
        col: 20,
        label: 'Invoice Date:',
        labelCol: 1,
        value: '',
        length: 10,
        type: FieldType.INPUT,
        tabIndex: 2
      },
      {
        id: 'customerName',
        row: 9,
        col: 20,
        label: 'Customer Name:',
        labelCol: 1,
        value: '',
        length: 50,
        type: FieldType.INPUT,
        tabIndex: 3
      },
      {
        id: 'customerAddress',
        row: 10,
        col: 20,
        label: 'Address:',
        labelCol: 1,
        value: '',
        length: 50,
        type: FieldType.INPUT,
        tabIndex: 4
      },
      {
        id: 'itemDescription',
        row: 12,
        col: 20,
        label: 'Item Description:',
        labelCol: 1,
        value: '',
        length: 50,
        type: FieldType.INPUT,
        tabIndex: 5
      },
      {
        id: 'quantity',
        row: 13,
        col: 20,
        label: 'Quantity:',
        labelCol: 1,
        value: '',
        length: 10,
        type: FieldType.INPUT,
        tabIndex: 6
      },
      {
        id: 'unitPrice',
        row: 14,
        col: 20,
        label: 'Unit Price:',
        labelCol: 1,
        value: '',
        length: 15,
        type: FieldType.INPUT,
        tabIndex: 7
      },
      {
        id: 'totalAmount',
        row: 15,
        col: 20,
        label: 'Total Amount:',
        labelCol: 1,
        value: '',
        length: 15,
        type: FieldType.DISPLAY,
        tabIndex: 8
      }
    ],
    footer: {
      pfKeys: [
        { key: 1, label: '1-HELP', action: 'HELP', enabled: true },
        { key: 3, label: '3-END', action: 'END', enabled: true },
        { key: 5, label: '5-SAVE', action: 'SAVE', enabled: true },
        { key: 7, label: '7-CALC', action: 'CALCULATE', enabled: true },
        { key: 11, label: '11-NXT', action: 'NEXT', enabled: true }
      ]
    }
  };
}

/**
 * Example: Menu/Main Screen
 */
export function getMenuScreen(): MainframeScreen {
  const now = new Date();
  
  return {
    screenId: 'MENU-01',
    title: 'Main Menu',
    header: {
      systemId: 'MENU-01',
      menuItems: ['M', 'B', 'E', 'S'],
      date: formatDate(now),
      time: formatTime(now),
      transactionId: 'T00',
      receivedType: 'Main System Menu',
      pageNumber: 1,
      totalPages: 1,
      balance: ''
    },
    fields: [
      {
        id: 'menuTitle',
        row: 5,
        col: 30,
        value: '*** MAIN SYSTEM MENU ***',
        length: 25,
        type: FieldType.LABEL
      },
      {
        id: 'option1',
        row: 8,
        col: 25,
        value: '1. Customer Information',
        length: 30,
        type: FieldType.LABEL
      },
      {
        id: 'option2',
        row: 9,
        col: 25,
        value: '2. Invoice Entry',
        length: 30,
        type: FieldType.LABEL
      },
      {
        id: 'option3',
        row: 10,
        col: 25,
        value: '3. Reports',
        length: 30,
        type: FieldType.LABEL
      },
      {
        id: 'option4',
        row: 11,
        col: 25,
        value: '4. System Administration',
        length: 30,
        type: FieldType.LABEL
      },
      {
        id: 'option5',
        row: 12,
        col: 25,
        value: '5. Exit',
        length: 30,
        type: FieldType.LABEL
      },
      {
        id: 'selection',
        row: 15,
        col: 35,
        label: 'Selection:',
        labelCol: 25,
        value: '',
        length: 2,
        type: FieldType.INPUT,
        tabIndex: 1
      }
    ],
    footer: {
      pfKeys: [
        { key: 1, label: '1-HELP', action: 'HELP', enabled: true },
        { key: 3, label: '3-END', action: 'END', enabled: true }
      ]
    }
  };
}

/**
 * Example: Report Display Screen
 */
export function getReportScreen(): MainframeScreen {
  const now = new Date();
  
  return {
    screenId: 'RPT-001',
    title: 'Monthly Sales Report',
    header: {
      systemId: 'RPT-001',
      menuItems: ['M', 'B', 'E', 'S'],
      date: formatDate(now),
      time: formatTime(now),
      transactionId: 'T50',
      receivedType: 'Report Display',
      pageNumber: 1,
      totalPages: 5,
      balance: ''
    },
    fields: [
      {
        id: 'reportTitle',
        row: 5,
        col: 25,
        value: 'MONTHLY SALES REPORT - OCTOBER 2023',
        length: 40,
        type: FieldType.LABEL
      },
      {
        id: 'header1',
        row: 7,
        col: 5,
        value: 'CUSTOMER',
        length: 30,
        type: FieldType.LABEL
      },
      {
        id: 'header2',
        row: 7,
        col: 40,
        value: 'INVOICE',
        length: 15,
        type: FieldType.LABEL
      },
      {
        id: 'header3',
        row: 7,
        col: 60,
        value: 'AMOUNT',
        length: 15,
        type: FieldType.LABEL
      },
      {
        id: 'separator',
        row: 8,
        col: 5,
        value: '___________________________________________________________________________',
        length: 75,
        type: FieldType.LABEL
      },
      // Sample data rows
      {
        id: 'data1',
        row: 9,
        col: 5,
        value: 'ACME CORPORATION',
        length: 30,
        type: FieldType.DISPLAY
      },
      {
        id: 'data2',
        row: 9,
        col: 40,
        value: 'INV-2023-001',
        length: 15,
        type: FieldType.DISPLAY
      },
      {
        id: 'data3',
        row: 9,
        col: 60,
        value: '$1,234.56',
        length: 15,
        type: FieldType.DISPLAY
      }
    ],
    footer: {
      pfKeys: [
        { key: 1, label: '1-HELP', action: 'HELP', enabled: true },
        { key: 3, label: '3-END', action: 'END', enabled: true },
        { key: 7, label: '7-UP', action: 'PAGE_UP', enabled: true },
        { key: 8, label: '8-DOWN', action: 'PAGE_DOWN', enabled: true },
        { key: 9, label: '9-PRINT', action: 'PRINT', enabled: true }
      ]
    }
  };
}

/**
 * Example: Login Screen
 */
export function getLoginScreen(): MainframeScreen {
  const now = new Date();
  
  return {
    screenId: 'LOGIN-01',
    title: 'System Login',
    header: {
      systemId: 'SYS-V1.0',
      menuItems: [],
      date: formatDate(now),
      time: formatTime(now),
      transactionId: '',
      receivedType: 'System Login - Enter Credentials',
      pageNumber: 1,
      totalPages: 1,
      balance: ''
    },
    fields: [
      {
        id: 'systemName',
        row: 5,
        col: 30,
        value: '*** SYSTEM LOGIN ***',
        length: 20,
        type: FieldType.LABEL
      },
      {
        id: 'username',
        row: 10,
        col: 25,
        label: 'User ID:',
        labelCol: 15,
        value: '',
        length: 20,
        type: FieldType.INPUT,
        tabIndex: 1
      },
      {
        id: 'password',
        row: 11,
        col: 25,
        label: 'Password:',
        labelCol: 15,
        value: '',
        length: 20,
        type: FieldType.INPUT,
        tabIndex: 2
      },
      {
        id: 'instructions',
        row: 14,
        col: 20,
        value: 'Press ENTER to login or F3 to exit',
        length: 40,
        type: FieldType.LABEL
      }
    ],
    footer: {
      pfKeys: [
        { key: 1, label: '1-HELP', action: 'HELP', enabled: true },
        { key: 3, label: '3-EXIT', action: 'EXIT', enabled: true }
      ]
    }
  };
}

/**
 * Utility function to format date
 */
function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Utility function to format time
 */
function formatTime(date: Date): string {
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
}

/**
 * Example: How to use these screens in your service
 */
export function registerAllExampleScreens(screenService: any): void {
  screenService.registerScreen(getInvoiceScreen());
  screenService.registerScreen(getMenuScreen());
  screenService.registerScreen(getReportScreen());
  screenService.registerScreen(getLoginScreen());
}

