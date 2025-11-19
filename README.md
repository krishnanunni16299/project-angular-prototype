# Mainframe Terminal - Angular Component

An authentic vintage mainframe terminal interface built with Angular, featuring CRT monitor aesthetics and pixel-perfect mainframe styling.

![Mainframe Terminal](./docs/screenshot.png)

## Features

✅ **Authentic CRT Display**
- Black background (#000000) with bright green text (#00FF00)
- Monospace fonts (IBM Plex Mono / Courier New)
- Scan line overlay effect
- CRT glow and phosphor effects
- Authentic character-based grid layout (80 columns)

✅ **Mainframe Functionality**
- Function key support (PF1-PF12)
- Tab-based field navigation
- Character-based field formatting with underscores
- Uppercase text enforcement
- Field length validation

✅ **Template-Driven Architecture**
- Reusable component for any mainframe screen
- Data-driven screen definitions
- Easy to add new screens
- Type-safe TypeScript models

## Quick Start

### Installation

```bash
npm install
```

### Development Server

```bash
npm start
```

Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   └── mainframe-terminal/
│   │       ├── mainframe-terminal.component.ts     # Main component
│   │       ├── mainframe-terminal.component.html   # Template
│   │       └── mainframe-terminal.component.css    # CRT styling
│   ├── models/
│   │   └── mainframe-screen.model.ts              # Data models
│   ├── services/
│   │   └── mainframe-screen.service.ts            # Screen management
│   └── examples/
│       └── example-screens.ts                     # Sample screens
├── styles.css                                     # Global styles
└── index.html
```

## Usage

### Creating a New Screen

1. **Define the Screen Data**

```typescript
import { MainframeScreen, FieldType } from './models/mainframe-screen.model';

const myScreen: MainframeScreen = {
  screenId: 'MY-SCREEN-01',
  title: 'My Custom Screen',
  header: {
    systemId: 'MY-SCREEN-01',
    menuItems: ['M', 'B', 'E', 'S'],
    date: '2023-10-11',
    time: '11:08:05',
    transactionId: 'T21',
    receivedType: 'Screen Type Information',
    pageNumber: 1,
    totalPages: 1,
    balance: '0.00'
  },
  fields: [
    {
      id: 'field1',
      row: 7,
      col: 16,
      label: 'Field Label:',
      labelCol: 1,
      value: 'Initial Value',
      length: 60,
      type: FieldType.INPUT,
      tabIndex: 1
    }
    // Add more fields...
  ],
  footer: {
    pfKeys: [
      { key: 1, label: '1-HELP', action: 'HELP', enabled: true },
      { key: 3, label: '3-END', action: 'END', enabled: true },
      { key: 11, label: '11-NXT', action: 'NEXT', enabled: true }
    ]
  }
};
```

2. **Register the Screen**

```typescript
import { MainframeScreenService } from './services/mainframe-screen.service';

constructor(private screenService: MainframeScreenService) {
  // Register your screen
  this.screenService.registerScreen(myScreen);
  
  // Navigate to it
  this.screenService.navigateToScreen('MY-SCREEN-01');
}
```

### Field Types

```typescript
enum FieldType {
  DISPLAY = 'DISPLAY',      // Read-only display
  INPUT = 'INPUT',          // Editable input
  LABEL = 'LABEL',          // Static label
  PROTECTED = 'PROTECTED'   // Protected field
}
```

### Field Definition Properties

| Property | Type | Description |
|----------|------|-------------|
| `id` | string | Unique field identifier |
| `row` | number | Row position (1-24) |
| `col` | number | Column position (1-80) |
| `label` | string | Field label text |
| `labelCol` | number | Label column position |
| `value` | string | Current field value |
| `length` | number | Maximum character length |
| `type` | FieldType | Field type |
| `color` | string | Custom color (optional) |
| `padChar` | string | Padding character (default: '_') |
| `tabIndex` | number | Tab navigation order |

## Keyboard Navigation

| Key | Function |
|-----|----------|
| **Tab** | Move to next field |
| **Shift+Tab** | Move to previous field |
| **F1-F12** | Execute PF key functions |
| **Escape** | Exit/End (same as F3) |

## PF Key Functions

Common PF key assignments (customizable):

- **PF1** - Help
- **PF3** - End/Exit
- **PF7** - Page Up
- **PF8** - Page Down
- **PF11** - Next Screen
- **PF12** - Previous Screen

## Styling Details

### Colors
- Background: `#000000` (pure black)
- Text: `#00FF00` (bright green)
- Glow: `text-shadow: 0 0 3px #00FF00, 0 0 5px #00FF00`

### Typography
- Font: `'IBM Plex Mono', 'Courier New', monospace`
- Size: `15px` (13px on tablets, 12px on mobile)
- Line height: `1.3`
- Letter spacing: `0.5px`

### CRT Effects
- Scan lines with subtle flicker animation
- Radial vignette overlay
- Phosphor glow
- Screen curvature simulation

## Advanced Customization

### Custom Field Validation

Extend the `MainframeScreenService` to add custom validation:

```typescript
validateField(fieldId: string): ValidationResult {
  const field = this.getField(fieldId);
  
  // Add your validation logic
  if (field.id === 'email' && !field.value.includes('@')) {
    return {
      isValid: false,
      fieldId,
      errorMessage: 'Invalid email format'
    };
  }
  
  return { isValid: true, fieldId };
}
```

### Custom PF Key Actions

Handle PF key presses in your component:

```typescript
handlePFKey(keyNumber: number): void {
  switch(keyNumber) {
    case 1:
      // Show help dialog
      break;
    case 3:
      // Navigate back
      this.screenService.goBack();
      break;
    case 5:
      // Save data
      this.saveCurrentScreen();
      break;
    // Add more cases...
  }
}
```

### Multiple Screen Navigation

```typescript
// Define screen flow
const screens = {
  'MENU': menuScreen,
  'CUSTOMER': customerScreen,
  'INVOICE': invoiceScreen,
  'REPORT': reportScreen
};

// Register all screens
Object.values(screens).forEach(screen => {
  this.screenService.registerScreen(screen);
});

// Navigate between screens
this.screenService.navigateToScreen('CUSTOMER');
```

## Example: Adding a New Screen Type

Here's a complete example of adding an Invoice screen:

```typescript
const invoiceScreen: MainframeScreen = {
  screenId: 'INV-001',
  title: 'Invoice Information',
  header: {
    systemId: 'INV-001',
    menuItems: ['M', 'B', 'E', 'S'],
    date: this.formatDate(new Date()),
    time: this.formatTime(new Date()),
    transactionId: 'T22',
    receivedType: 'Invoice Type: R (R-regular, C-credit, D-debit)',
    pageNumber: 1,
    totalPages: 1,
    balance: '1,234.56'
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
      id: 'amount',
      row: 10,
      col: 20,
      label: 'Amount:',
      labelCol: 1,
      value: '',
      length: 15,
      type: FieldType.INPUT,
      tabIndex: 4
    }
  ],
  footer: {
    pfKeys: [
      { key: 1, label: '1-HELP', action: 'HELP', enabled: true },
      { key: 3, label: '3-END', action: 'END', enabled: true },
      { key: 5, label: '5-SAVE', action: 'SAVE', enabled: true },
      { key: 11, label: '11-NXT', action: 'NEXT', enabled: true }
    ]
  }
};
```

## Technical Requirements

- **Angular**: 17.0+
- **TypeScript**: 5.2+
- **Node.js**: 20.0+
- **RxJS**: 7.8+

## Browser Support

- Chrome/Edge: Latest 2 versions
- Firefox: Latest 2 versions
- Safari: Latest 2 versions

**Note**: CRT effects work best on modern browsers with CSS animation support.

## Accessibility

While maintaining the mainframe aesthetic, the component includes:
- Full keyboard navigation
- Proper focus management
- Tab index support
- Screen reader compatible (when needed)

## Performance Considerations

- Uses Angular standalone components for optimal bundle size
- RxJS subscriptions properly managed with `takeUntil`
- CSS animations use `transform` for GPU acceleration
- Minimal DOM manipulation

## License

MIT

## Contributing

Contributions are welcome! Please ensure all new screens follow the established mainframe aesthetic guidelines.

## Roadmap

- [ ] Multi-page screen support
- [ ] Color syntax highlighting (multiple colors)
- [ ] Sound effects (keyboard clicks)
- [ ] Screen history navigation
- [ ] Export screen definitions to JSON
- [ ] Import legacy mainframe screen definitions
- [ ] Mock data generation utilities
- [ ] Unit tests and E2E tests

## Credits

Built with ❤️ for mainframe enthusiasts

Fonts: IBM Plex Mono by IBM

