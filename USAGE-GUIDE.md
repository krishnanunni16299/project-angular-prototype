# Mainframe Terminal Component - Usage Guide

This guide provides step-by-step instructions for using and extending the mainframe terminal component.

## Table of Contents

1. [Getting Started](#getting-started)
2. [Creating Your First Screen](#creating-your-first-screen)
3. [Screen Layout Guidelines](#screen-layout-guidelines)
4. [Field Configuration](#field-configuration)
5. [Navigation and PF Keys](#navigation-and-pf-keys)
6. [Advanced Examples](#advanced-examples)
7. [Best Practices](#best-practices)
8. [Troubleshooting](#troubleshooting)

## Getting Started

### Step 1: Install Dependencies

```bash
npm install
```

### Step 2: Run the Application

```bash
npm start
```

The application will open at `http://localhost:4200/` showing the default Customer Information screen (SS6T-6).

### Step 3: Explore the Example

- Try typing in the fields (text automatically converts to uppercase)
- Use **Tab** to navigate between fields
- Press **F1** for Help, **F3** to Exit, **F11** for Next
- Notice the authentic CRT effects: scan lines, green glow, and screen curvature

## Creating Your First Screen

Let's create a simple employee information screen step by step.

### Step 1: Define Your Screen Structure

Create a new file: `src/app/screens/employee-screen.ts`

```typescript
import { MainframeScreen, FieldType } from '../models/mainframe-screen.model';

export function getEmployeeScreen(): MainframeScreen {
  const now = new Date();
  
  return {
    // Unique identifier for this screen
    screenId: 'EMP-001',
    
    // Human-readable title
    title: 'Employee Information',
    
    // Header configuration
    header: {
      systemId: 'EMP-001',              // Appears top-left
      menuItems: ['M', 'B', 'E', 'S'],  // Menu indicators
      date: formatDate(now),             // Top-right date
      time: formatTime(now),             // Top-right time
      transactionId: 'T40',              // Transaction ID
      receivedType: 'Employee Management System',
      pageNumber: 1,
      totalPages: 1,
      balance: ''                        // Can be used for any info
    },
    
    // Define all fields on the screen
    fields: [
      {
        id: 'employeeId',           // Unique field ID
        row: 7,                      // Row position (1-24)
        col: 20,                     // Column position (1-80)
        label: 'Employee ID:',       // Label text
        labelCol: 1,                 // Where label starts
        value: '',                   // Initial value
        length: 10,                  // Max characters
        type: FieldType.INPUT,       // Field type
        tabIndex: 1                  // Tab order
      },
      {
        id: 'firstName',
        row: 8,
        col: 20,
        label: 'First Name:',
        labelCol: 1,
        value: '',
        length: 30,
        type: FieldType.INPUT,
        tabIndex: 2
      },
      {
        id: 'lastName',
        row: 9,
        col: 20,
        label: 'Last Name:',
        labelCol: 1,
        value: '',
        length: 30,
        type: FieldType.INPUT,
        tabIndex: 3
      },
      {
        id: 'department',
        row: 10,
        col: 20,
        label: 'Department:',
        labelCol: 1,
        value: '',
        length: 25,
        type: FieldType.INPUT,
        tabIndex: 4
      },
      {
        id: 'position',
        row: 11,
        col: 20,
        label: 'Position:',
        labelCol: 1,
        value: '',
        length: 30,
        type: FieldType.INPUT,
        tabIndex: 5
      },
      {
        id: 'hireDate',
        row: 12,
        col: 20,
        label: 'Hire Date:',
        labelCol: 1,
        value: '',
        length: 10,
        type: FieldType.INPUT,
        tabIndex: 6
      },
      {
        id: 'salary',
        row: 13,
        col: 20,
        label: 'Salary:',
        labelCol: 1,
        value: '',
        length: 15,
        type: FieldType.INPUT,
        tabIndex: 7
      }
    ],
    
    // Footer with PF key definitions
    footer: {
      pfKeys: [
        { key: 1, label: '1-HELP', action: 'HELP', enabled: true },
        { key: 3, label: '3-END', action: 'END', enabled: true },
        { key: 5, label: '5-SAVE', action: 'SAVE', enabled: true },
        { key: 7, label: '7-PREV', action: 'PREVIOUS', enabled: true },
        { key: 8, label: '8-NEXT', action: 'NEXT', enabled: true }
      ]
    }
  };
}

// Helper functions
function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function formatTime(date: Date): string {
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
}
```

### Step 2: Register Your Screen

In `src/app/services/mainframe-screen.service.ts`, add your screen to the constructor:

```typescript
import { getEmployeeScreen } from '../screens/employee-screen';

constructor() {
  // Register existing screens
  this.registerScreen(this.getCustomerInformationScreen());
  
  // Register your new screen
  this.registerScreen(getEmployeeScreen());
}
```

### Step 3: Navigate to Your Screen

Update your component or add navigation logic:

```typescript
ngOnInit(): void {
  // Navigate to your screen
  this.screenService.navigateToScreen('EMP-001');
}
```

## Screen Layout Guidelines

### Row and Column System

The mainframe terminal uses a **24-row by 80-column** character grid.

```
Rows: 1-24 (from top to bottom)
Columns: 1-80 (from left to right)
```

### Typical Screen Layout

```
Row 1:   [System ID]        [Menu Items]           [Date/Time]
Row 2:   [Transaction ID]   [Screen Title]         [Time]
Row 3:   [Received Type Info]                      [Page Info]
Row 4:   [Additional Header]                       [Balance/Info]
Row 5:   ─────────────────────────────────────────────────────
Row 6:   [Section Title]
Row 7:   Label: Field_____________________________________
Row 8:   Label: Field_____________________________________
...      (Form fields)
...
Row 22:  ─────────────────────────────────────────────────────
Row 23:  PF: 1-HELP  3-END  11-NEXT
Row 24:  (Reserved)
```

### Standard Field Positioning

**Labels typically start at:**
- Column 1: Left-aligned labels
- Column 10-15: Indented labels

**Fields typically start at:**
- Column 15-20: After labels
- Allows for 12-15 character labels

### Example Layout Calculations

```
"Full name:" label (10 chars) at col 1
Field starts at col 12 (label + 1 space + colon)
Field length 60 chars
Total space used: cols 1-72
```

## Field Configuration

### Field Types

1. **INPUT** - Editable by user
   ```typescript
   {
     id: 'username',
     type: FieldType.INPUT,
     value: '',
     length: 20
   }
   ```

2. **DISPLAY** - Read-only, shows data
   ```typescript
   {
     id: 'totalAmount',
     type: FieldType.DISPLAY,
     value: '1234.56',
     length: 15
   }
   ```

3. **LABEL** - Static text
   ```typescript
   {
     id: 'header',
     type: FieldType.LABEL,
     value: '*** SECTION HEADER ***',
     length: 25
   }
   ```

4. **PROTECTED** - Cannot be edited
   ```typescript
   {
     id: 'systemField',
     type: FieldType.PROTECTED,
     value: 'PROTECTED_DATA',
     length: 20
   }
   ```

### Field Properties Explained

| Property | Required | Description | Example |
|----------|----------|-------------|---------|
| `id` | Yes | Unique identifier | `'firstName'` |
| `row` | Yes | Vertical position | `7` |
| `col` | Yes | Horizontal position | `20` |
| `value` | Yes | Current value | `'JOHN'` |
| `length` | Yes | Maximum characters | `30` |
| `type` | Yes | Field type | `FieldType.INPUT` |
| `label` | No | Label text | `'First Name:'` |
| `labelCol` | No | Label position | `1` |
| `color` | No | Custom color | `'#00FF00'` |
| `padChar` | No | Padding character | `'_'` (default) |
| `tabIndex` | No | Tab order | `1` |

### Multi-Field Rows (City, State, ZIP example)

```typescript
// City field
{
  id: 'city',
  row: 13,
  col: 6,           // After "City:" label
  label: 'City:',
  labelCol: 1,
  value: '',
  length: 30,
  type: FieldType.INPUT,
  tabIndex: 8
},
// State field (same row)
{
  id: 'state',
  row: 13,          // Same row as city
  col: 42,          // After city field + space
  label: 'St:',
  labelCol: 38,
  value: '',
  length: 2,
  type: FieldType.INPUT,
  tabIndex: 9
},
// ZIP field (same row)
{
  id: 'zip',
  row: 13,          // Same row
  col: 52,          // After state + space
  label: 'ZIP:',
  labelCol: 47,
  value: '',
  length: 10,
  type: FieldType.INPUT,
  tabIndex: 10
}
```

## Navigation and PF Keys

### Standard PF Key Assignments

| Key | Common Use | Action |
|-----|------------|--------|
| F1 | Help | Show help screen |
| F2 | Refresh | Refresh current screen |
| F3 | Exit/End | Return to previous screen |
| F4 | Prompt | Show selection list |
| F5 | Save | Save current data |
| F6 | Add | Add new record |
| F7 | Page Up | Scroll up |
| F8 | Page Down | Scroll down |
| F9 | Clear | Clear all fields |
| F10 | Actions | Show action menu |
| F11 | Next | Next screen/record |
| F12 | Cancel | Cancel operation |

### Implementing PF Key Actions

In your service or component:

```typescript
handlePFKey(keyNumber: number): void {
  const currentScreen = this.currentScreen$.value;
  if (!currentScreen) return;

  const pfKey = currentScreen.footer.pfKeys.find(
    key => key.key === keyNumber
  );
  
  if (pfKey && pfKey.enabled) {
    switch (pfKey.action) {
      case 'HELP':
        this.showHelp();
        break;
        
      case 'END':
        this.goBack();
        break;
        
      case 'SAVE':
        this.saveData();
        break;
        
      case 'NEXT':
        this.navigateToScreen('NEXT-SCREEN-ID');
        break;
        
      case 'CALCULATE':
        this.performCalculation();
        break;
        
      default:
        console.log(`PF${keyNumber}: ${pfKey.action}`);
    }
  }
}
```

### Tab Order Best Practices

1. **Sequential numbering**: Use 1, 2, 3, 4...
2. **Top to bottom, left to right**: Follow natural reading order
3. **Skip display-only fields**: Only INPUT types need tab indexes
4. **Group related fields**: Keep logical groups together

## Advanced Examples

### Example 1: Multi-Page Screen

```typescript
export function getMultiPageReport(): MainframeScreen {
  return {
    screenId: 'RPT-MULTI',
    title: 'Multi-Page Report',
    header: {
      systemId: 'RPT-MULTI',
      menuItems: ['M', 'B', 'E', 'S'],
      date: formatDate(new Date()),
      time: formatTime(new Date()),
      transactionId: 'T60',
      receivedType: 'Report Display - Multiple Pages',
      pageNumber: 1,    // Current page
      totalPages: 10,   // Total pages
      balance: ''
    },
    fields: [
      // ... field definitions
    ],
    footer: {
      pfKeys: [
        { key: 1, label: '1-HELP', action: 'HELP', enabled: true },
        { key: 3, label: '3-END', action: 'END', enabled: true },
        { key: 7, label: '7-UP', action: 'PAGE_UP', enabled: true },
        { key: 8, label: '8-DOWN', action: 'PAGE_DOWN', enabled: true }
      ]
    }
  };
}
```

### Example 2: Calculated Fields

```typescript
// In your component or service
updateCalculatedField(): void {
  const currentScreen = this.currentScreen$.value;
  if (!currentScreen) return;
  
  // Get quantity and price fields
  const qtyField = currentScreen.fields.find(f => f.id === 'quantity');
  const priceField = currentScreen.fields.find(f => f.id === 'unitPrice');
  const totalField = currentScreen.fields.find(f => f.id === 'totalAmount');
  
  if (qtyField && priceField && totalField) {
    const qty = parseFloat(qtyField.value) || 0;
    const price = parseFloat(priceField.value) || 0;
    const total = qty * price;
    
    totalField.value = total.toFixed(2);
    this.currentScreen$.next({ ...currentScreen });
  }
}
```

### Example 3: Conditional Field Visibility

```typescript
export function getConditionalScreen(showAdvanced: boolean): MainframeScreen {
  const baseFields = [
    // Basic fields always shown
    {
      id: 'name',
      row: 7,
      col: 20,
      label: 'Name:',
      labelCol: 1,
      value: '',
      length: 40,
      type: FieldType.INPUT,
      tabIndex: 1
    }
  ];
  
  const advancedFields = showAdvanced ? [
    // Advanced fields shown conditionally
    {
      id: 'advancedOption',
      row: 10,
      col: 20,
      label: 'Advanced:',
      labelCol: 1,
      value: '',
      length: 30,
      type: FieldType.INPUT,
      tabIndex: 2
    }
  ] : [];
  
  return {
    screenId: 'COND-01',
    title: 'Conditional Fields',
    header: { /* ... */ },
    fields: [...baseFields, ...advancedFields],
    footer: { /* ... */ }
  };
}
```

## Best Practices

### 1. Screen Design

✅ **DO:**
- Keep screens simple and focused on one task
- Group related fields together
- Use consistent spacing throughout
- Provide clear labels
- Show field length with underscores

❌ **DON'T:**
- Overcrowd the screen with too many fields
- Mix unrelated data
- Use inconsistent alignment
- Create fields longer than the screen width

### 2. Field Naming

✅ **DO:**
```typescript
id: 'customerName'      // Clear, descriptive
id: 'invoiceDate'       // Follows convention
id: 'totalAmount'       // Easy to understand
```

❌ **DON'T:**
```typescript
id: 'field1'            // Too generic
id: 'x'                 // Not descriptive
id: 'CustomerName'      // Use camelCase
```

### 3. Color Usage

While the mainframe terminal is primarily green-on-black, you can use color for emphasis:

```typescript
{
  id: 'errorMessage',
  row: 20,
  col: 1,
  value: 'ERROR: Invalid input',
  length: 50,
  type: FieldType.LABEL,
  color: '#FF0000'  // Red for errors
}
```

**Standard colors:**
- `#00FF00` - Normal text (green)
- `#FF0000` - Errors (red)
- `#FFFF00` - Warnings (yellow)
- `#00FFFF` - Highlights (cyan)

### 4. Performance

For screens with many fields:

```typescript
// Use trackBy in templates
<div *ngFor="let field of fields; trackBy: trackByFieldId">
  <!-- field content -->
</div>

// In component
trackByFieldId(index: number, field: FieldDefinition): string {
  return field.id;
}
```

## Troubleshooting

### Issue: Fields Don't Align Properly

**Cause:** Incorrect column calculations

**Solution:** Remember each character is 1 column wide
```typescript
// Label is 12 characters: "Full name:" + space
// Field should start at column 13 or later
label: 'Full name:',
labelCol: 1,
col: 16  // 1 + 11 (label) + 1 (space) + 3 (padding)
```

### Issue: Text Overflows Field

**Cause:** Field length too small or value too long

**Solution:** Enforce max length
```typescript
// In component
onFieldChange(field: FieldDefinition, event: any): void {
  let value = event.target.value;
  value = value.substring(0, field.length);  // Enforce max
  this.screenService.updateFieldValue(field.id, value);
}
```

### Issue: CRT Effects Not Showing

**Cause:** Browser doesn't support CSS animations

**Solution:** Check browser compatibility
```css
@supports (animation: flicker 0.15s infinite) {
  .scanlines {
    animation: flicker 0.15s infinite;
  }
}
```

### Issue: PF Keys Not Working

**Cause:** Keyboard event not captured

**Solution:** Ensure HostListener is set up
```typescript
@HostListener('window:keydown', ['$event'])
handleKeyDown(event: KeyboardEvent): void {
  if (event.key.startsWith('F')) {
    event.preventDefault();  // Important!
    const keyNumber = parseInt(event.key.substring(1), 10);
    this.screenService.handlePFKey(keyNumber);
  }
}
```

## Next Steps

1. **Review the example screens** in `src/app/examples/example-screens.ts`
2. **Create your first custom screen** following this guide
3. **Test keyboard navigation** and PF keys
4. **Customize the styling** if needed (maintain mainframe aesthetic)
5. **Add data persistence** for your screens

For more information, see the main [README.md](README.md)

## Support

If you encounter issues:
1. Check this guide's troubleshooting section
2. Review the example screens
3. Verify your screen definition matches the model interface
4. Check browser console for errors

Happy mainframe coding! 🖥️

