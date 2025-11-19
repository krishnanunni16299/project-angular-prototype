# Quick Start Guide - Mainframe Terminal Component

Get up and running with the mainframe terminal in 5 minutes!

## Prerequisites

- Node.js 20.0+ installed
- npm or yarn package manager
- Basic knowledge of Angular

## Installation

```bash
# Clone or download the project
cd project-angular-prototype

# Install dependencies
npm install
```

## Run the Application

```bash
npm start
```

Open your browser to `http://localhost:4200/`

You'll see the Customer Information screen (SS6T-6) with authentic CRT styling.

## Try These Actions

### Keyboard Navigation
1. Click in the "Description" field
2. Press **Tab** to move to the next field
3. Press **Shift+Tab** to go back
4. Type some text - notice it converts to uppercase automatically

### Function Keys
- Press **F1** - Help function
- Press **F3** - End/Exit function  
- Press **F11** - Next function
- Press **Escape** - Same as F3

### Field Editing
- Type in any field - text is limited to the field length
- Notice the underscore padding for empty spaces
- Watch the green CRT glow as you type

## Creating Your First Screen in 3 Steps

### Step 1: Create Screen Definition

Create `src/app/screens/my-screen.ts`:

```typescript
import { MainframeScreen, FieldType } from '../models/mainframe-screen.model';

export function getMyScreen(): MainframeScreen {
  const now = new Date();
  
  return {
    screenId: 'MY-001',
    title: 'My First Screen',
    header: {
      systemId: 'MY-001',
      menuItems: ['M', 'B', 'E', 'S'],
      date: formatDate(now),
      time: formatTime(now),
      transactionId: 'T99',
      receivedType: 'My Custom Screen',
      pageNumber: 1,
      totalPages: 1,
      balance: ''
    },
    fields: [
      {
        id: 'myField',
        row: 7,
        col: 20,
        label: 'My Field:',
        labelCol: 1,
        value: 'TEST_VALUE',
        length: 40,
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

Edit `src/app/services/mainframe-screen.service.ts`:

```typescript
import { getMyScreen } from '../screens/my-screen';

constructor() {
  // Add this line
  this.registerScreen(getMyScreen());
  
  // Existing code...
  this.registerScreen(this.getCustomerInformationScreen());
}
```

### Step 3: Navigate to Your Screen

Change the screen ID in `src/app/components/mainframe-terminal/mainframe-terminal.component.ts`:

```typescript
ngOnInit(): void {
  // Change this line
  this.screenService.navigateToScreen('MY-001');  // Was 'SS6T-6'
  
  // Rest of the code...
}
```

Save and refresh - you'll see your screen!

## What's Next?

### Learn More
- Read the [USAGE-GUIDE.md](USAGE-GUIDE.md) for detailed instructions
- Check [README.md](README.md) for complete documentation
- Explore examples in `src/app/examples/example-screens.ts`

### Add More Screens
1. Create invoice screens
2. Create menu screens
3. Create report screens
4. Connect to backend APIs

### Customize Styling
Edit `src/app/components/mainframe-terminal/mainframe-terminal.component.css`:
- Change colors (but keep it authentic!)
- Adjust CRT effects
- Modify scan line intensity
- Adjust font sizes

### Add Features
- Form validation
- Data persistence
- Multiple page support
- Print functionality
- Screen history

## Common Customizations

### Change Primary Color

In CSS file, replace `#00FF00` with your color:
```css
color: #00FFFF;  /* Cyan instead of green */
```

### Disable CRT Effects

Comment out in CSS:
```css
/* .scanlines {
  animation: flicker 0.15s infinite;
} */
```

### Add More PF Keys

In your screen definition:
```typescript
footer: {
  pfKeys: [
    { key: 1, label: '1-HELP', action: 'HELP', enabled: true },
    { key: 3, label: '3-END', action: 'END', enabled: true },
    { key: 5, label: '5-SAVE', action: 'SAVE', enabled: true },
    { key: 7, label: '7-UP', action: 'PAGE_UP', enabled: true },
    { key: 8, label: '8-DOWN', action: 'PAGE_DOWN', enabled: true }
  ]
}
```

## Troubleshooting

### Port Already in Use
```bash
# Run on different port
ng serve --port 4300
```

### Module Not Found
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Changes Not Showing
- Hard refresh: **Ctrl+Shift+R** (Windows/Linux) or **Cmd+Shift+R** (Mac)
- Check browser console for errors
- Make sure the dev server is running

## Build for Production

```bash
npm run build
```

Output will be in `dist/` directory.

## Project Structure Overview

```
project-angular-prototype/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   └── mainframe-terminal/  ← Main component
│   │   ├── models/
│   │   │   └── mainframe-screen.model.ts  ← Data models
│   │   ├── services/
│   │   │   └── mainframe-screen.service.ts  ← Business logic
│   │   ├── examples/
│   │   │   └── example-screens.ts  ← Sample screens
│   │   └── screens/
│   │       └── (your custom screens here)
│   ├── styles.css  ← Global styles
│   └── index.html
├── README.md  ← Full documentation
├── USAGE-GUIDE.md  ← Detailed usage guide
└── package.json
```

## Tips for Success

1. **Start Simple** - Begin with a basic screen and add complexity
2. **Use Examples** - Copy and modify example screens
3. **Test Often** - Check your screen after each change
4. **Follow Conventions** - Maintain the mainframe aesthetic
5. **Read Docs** - The USAGE-GUIDE has answers to most questions

## Need Help?

- Check the [USAGE-GUIDE.md](USAGE-GUIDE.md) troubleshooting section
- Review example screens in `src/app/examples/`
- Verify your data model matches the interface
- Check browser console for errors

Happy coding! 🖥️💚

