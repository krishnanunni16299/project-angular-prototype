# Mainframe Screens Organization

This directory contains all the mainframe-style screens organized by menu option for better maintainability and clarity.

## Directory Structure

### `shared/`
Common screens used across the application:
- **welcome-screen** - Initial welcome/splash screen
- **login-screen** - User authentication screen
- **signon-confirmation-screen** - Login confirmation screen
- **menu-screen** - Main menu with options 1-6

---

### `option-1/` - Work Order Processing
Screens for managing work orders, transactions, and related processes:

1. **customer-info-screen** - Customer information entry
2. **work-order-transaction-screen** - Primary work order transaction entry
3. **work-order-transaction-alt-screen** - Alternative work order transaction (no postage fee)
4. **work-order-balance-screen** - Balance and payment tracking
5. **work-order-receipts-screen** - Receipt management
6. **confirm-work-order-screen** - Work order acceptance confirmation
7. **work-order-slip-printing-screen** - Slip printing options
8. **process-work-order-screen** - Process work order transactions
9. **service-of-process-screen** - Service of Process acknowledgement
10. **service-process-confirmation-screen** - SOP confirmation

---

### `option-4/` - SOP Maintenance
Screens for Service of Process maintenance operations:

1. **sop-maintenance-selection-screen** - Maintenance selection menu
2. **sop-file-maintenance-screen** - File maintenance form
3. **sop-confirmation-screen option4** - Confirmation screen for Option 4

---

### `option-5/` - SOP Amendment
Screens for SOP amendments:

1. **sop-amendment-entry-screen** - Amendment entry form
2. **sop-confirmation-screen** - Amendment confirmation

---

### `option-6/` - SOP Inquiry
Screens for inquiring and searching SOP records:

1. **sop-input-inquiry-screen** - Input inquiry form
2. **sop-inquiry-search-screen** - Search interface
3. **sop-inquiry-selection-screen** - Selection from search results
4. **sop-inquiry-detail-screen** - Detailed view of selected record

---

### `option-7/` - SOP Affidavit
Screen for SOP affidavit printing:

1. **sop-affidavit-printing-screen** - Affidavit printing options

---

### `option-8/` - SOP Standalone
Screen for SOP standalone letter generation:

1. **sop-standalone-letter-screen** - Standalone letter generation

---

## Screen Flow by Option

### Option 1 Flow - Work Order Processing
```
Menu → Customer Info → Work Order Transaction → [Alt Transaction] → 
Balance → Receipts → Confirm → Slip Printing → Process → 
Service of Process → Confirmation
```

### Option 4 Flow - SOP Maintenance
```
Menu → Maintenance Selection → File Maintenance → Confirmation
```

### Option 5 Flow - SOP Amendment
```
Menu → Amendment Entry → Confirmation
```

### Option 6 Flow - SOP Inquiry
```
Menu → Input Inquiry → Search → Selection → Detail
```

### Option 7 Flow - SOP Affidavit
```
Menu → Affidavit Printing
```

### Option 8 Flow - SOP Standalone
```
Menu → Standalone Letter
```

---

## Component Naming Convention

All components follow Angular best practices:
- **Component Class**: `[Name]ScreenComponent` (e.g., `CustomerInfoScreenComponent`)
- **Selector**: `app-[name]-screen` (e.g., `app-customer-info-screen`)
- **Files**: 
  - `[name]-screen.component.ts`
  - `[name]-screen.component.html`
  - `[name]-screen.component.css`

---

## Import Organization

In `mainframe-terminal.component.ts`, imports are organized by option:

```typescript
// Shared screens
import { WelcomeScreenComponent } from './screens/shared/welcome-screen/...';

// Option 1 - Work Order Processing
import { CustomerInfoScreenComponent } from './screens/option-1/customer-info-screen/...';

// Option 4 - SOP Maintenance
import { SopMaintenanceSelectionScreenComponent } from './screens/option-4/...';

// Option 5 - SOP Amendment
import { SopAmendmentEntryScreenComponent } from './screens/option-5/...';

// Option 6 - SOP Inquiry
import { SopInputInquiryScreenComponent } from './screens/option-6/...';

// Option 7 - SOP Affidavit
import { SopAffidavitPrintingScreenComponent } from './screens/option-7/...';

// Option 8 - SOP Standalone
import { SopStandaloneLetterScreenComponent } from './screens/option-8/...';
```

---

## Adding New Screens

When adding a new screen:

1. **Determine the option** it belongs to (1, 4, 5, 6, 7, 8, or shared)
2. **Create the screen** in the appropriate `option-X/` folder
3. **Update imports** in `mainframe-terminal.component.ts`
4. **Register the screen** in `mainframe-screen.service.ts`
5. **Add ngSwitch case** in `mainframe-terminal.component.html`
6. **Update this README** with the new screen information

---

## Mainframe Grid Standards

All screens must adhere to:
- **80 characters wide** × **24 lines tall**
- **Monospace font**: IBM Plex Mono
- **Font size**: 15px
- **Line height**: 1.25
- **Letter spacing**: 0.02em
- **CRT styling**: Green text (#50D8D5) with text-shadow glow
- **Host element**: Use `display: contents` in component CSS

---

## Navigation

Screens are navigated via `MainframeScreenService`:
- **F-Keys**: Mapped to specific actions (F1=HELP, F3=END, etc.)
- **Screen IDs**: Unique identifier for each screen
- **History**: Navigation history tracked for back/forward navigation

---

*Last Updated: November 21, 2025*

