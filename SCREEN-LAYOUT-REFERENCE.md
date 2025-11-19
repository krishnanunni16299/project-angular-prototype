# Screen Layout Reference Guide

Visual reference for creating mainframe terminal screens with proper positioning.

## Standard 80x24 Character Grid

```
Columns: |1----10---|20----30---|40----50---|60----70---|80
Rows:    |          |           |           |           |
─────────┼──────────┼───────────┼───────────┼───────────┼─
1        | System   |  M  B  E  S           |  Date     |
2        | T21      | SCREEN TITLE          |  Time     |
3        | Received Type Info...             |  Page 1/1 |
4        | Cust/Dept: ______                 | Balance   |
─────────┼──────────┼───────────┼───────────┼───────────┼─
5        | ───────  Section Header  ──────────────────── |
6        |          |           |           |           |
7        | Label:   | Field_____________________________|
8        | Label:   | Field_____________________________|
9        | Label:   | Field_____________________________|
...      | (Form content area)                          |
20       |          |           |           |           |
─────────┼──────────┼───────────┼───────────┼───────────┼─
21       |          |           |           |           |
22       |          |           |           |           |
23       | PF: 1-HELP  3-END  11-NEXT                   |
24       | (Reserved/Status)                            |
─────────┴──────────┴───────────┴───────────┴───────────┴─
```

## Header Layout (Rows 1-4)

### Row 1: System ID, Menu, Date
```
Column Position:
1-10    : System ID (e.g., "SS6T-6")
20-40   : Menu items (e.g., "M   B   E   S")
65-80   : Date (e.g., "2023-10-11")
```

### Row 2: Transaction, Title, Time
```
Column Position:
1-10    : Transaction ID (e.g., "T21")
20-60   : Screen title (centered)
65-80   : Time (e.g., "11:08:05")
```

### Row 3: Received Type, Page Info
```
Column Position:
1-60    : Received type description
65-80   : Page number (e.g., "Page 1 of 1")
```

### Row 4: Department ID, Balance
```
Column Position:
1-25    : Cust/DeptID with underscores
55-80   : Balance or other info
```

## Form Area (Rows 5-22)

### Single-Line Field Layout

```
Standard field:
─────────────────────────────────────────────
Row 7
Col 1      Col 16              Col 76
│          │                   │
Label:     Field_______________|

Label ends: Col 11 (includes colon)
Space:      Col 12-15 (padding)
Field:      Col 16-76 (60 chars)
```

### Multi-Field Row Layout (City/State/ZIP Example)

```
Row 13 - Multiple fields on one line:
─────────────────────────────────────────────────────────────
Col 1  Col 6    Col 36  Col 38 Col 42  Col 47  Col 52
│      │        │       │      │       │       │
City:  CHICAGO_________  St:   IL      ZIP:    60601_____

City label:  Col 1-5
City field:  Col 6-36 (30 chars)
State label: Col 38-41
State field: Col 42-44 (2 chars)
ZIP label:   Col 47-51
ZIP field:   Col 52-62 (10 chars)
```

### Telephone/Fax Row Layout

```
Row 15 - Contact information:
─────────────────────────────────────────────────────────
Col 1    Col 12        Col 43  Col 48
│        │             │       │
Telephone: 111-222-3333_____    Fax:    ___-___-____

Telephone label: Col 1-11
Telephone field: Col 12-37 (25 chars)
Fax label:       Col 43-47
Fax field:       Col 48-63 (15 chars)
```

## Footer Layout (Rows 22-24)

### Row 23: PF Keys
```
Standard PF key layout:
─────────────────────────────────────
Col 1
│
PF: 1-HELP  3-END  11-NEXT

Format: "PF: [key]-[LABEL]  [key]-[LABEL]"
Spacing: 2 spaces between keys
```

## Field Positioning Calculations

### Formula for Label + Field

```
Given:
- Label text: "Full name:" (10 characters including colon)
- Label column: 1
- Space between label and field: 5 columns
- Field length: 60 characters

Calculations:
Label position: Col 1-10
Field starts at: Col 1 + 10 + 5 = Col 16
Field ends at:   Col 16 + 60 - 1 = Col 75
```

### Multi-Field Row Calculations

```
Given three fields: City (30), State (2), ZIP (10)

City:
- Label "City:" at Col 1 (5 chars)
- Field at Col 6, length 30
- Ends at Col 36

State (with 5-col gap):
- Label "St:" at Col 38 (3 chars)  
- Field at Col 42, length 2
- Ends at Col 44

ZIP (with 5-col gap):
- Label "ZIP:" at Col 47 (4 chars)
- Field at Col 52, length 10
- Ends at Col 62

Total columns used: 62 of 80
```

## Common Field Lengths

| Field Type | Typical Length | Use Case |
|------------|----------------|----------|
| Name | 30-60 | Customer/employee names |
| Address | 50-60 | Street addresses |
| City | 20-30 | City names |
| State | 2 | US state codes |
| ZIP | 5-10 | ZIP codes (5 or 9 digit) |
| Phone | 12-25 | Phone numbers |
| Email | 40-60 | Email addresses |
| ID | 8-15 | Customer/employee IDs |
| Date | 10 | YYYY-MM-DD format |
| Currency | 12-15 | Dollar amounts |
| Description | 50-70 | General descriptions |

## Screen Templates

### Template 1: Simple Form

```typescript
const simpleForm: MainframeScreen = {
  screenId: 'SIMPLE-01',
  fields: [
    // Row 7: First field
    { id: 'field1', row: 7, col: 16, labelCol: 1, 
      label: 'Field One:', value: '', length: 60 },
    
    // Row 8: Second field
    { id: 'field2', row: 8, col: 16, labelCol: 1,
      label: 'Field Two:', value: '', length: 60 },
    
    // Row 9: Third field
    { id: 'field3', row: 9, col: 16, labelCol: 1,
      label: 'Field Three:', value: '', length: 60 }
  ]
};
```

### Template 2: Address Form

```typescript
const addressForm: MainframeScreen = {
  screenId: 'ADDRESS-01',
  fields: [
    // Row 7: Street
    { id: 'street', row: 7, col: 16, labelCol: 1,
      label: 'Street:', value: '', length: 60 },
    
    // Row 8: Street line 2
    { id: 'street2', row: 8, col: 16, value: '', length: 60 },
    
    // Row 9: City, State, ZIP
    { id: 'city', row: 9, col: 6, labelCol: 1,
      label: 'City:', value: '', length: 30 },
    { id: 'state', row: 9, col: 42, labelCol: 38,
      label: 'St:', value: '', length: 2 },
    { id: 'zip', row: 9, col: 52, labelCol: 47,
      label: 'ZIP:', value: '', length: 10 }
  ]
};
```

### Template 3: Report Display

```typescript
const reportDisplay: MainframeScreen = {
  screenId: 'REPORT-01',
  fields: [
    // Row 7: Column headers
    { id: 'header1', row: 7, col: 1,
      value: 'NAME', length: 30, type: FieldType.LABEL },
    { id: 'header2', row: 7, col: 35,
      value: 'AMOUNT', length: 15, type: FieldType.LABEL },
    
    // Row 8: Separator
    { id: 'separator', row: 8, col: 1,
      value: '_'.repeat(80), length: 80, type: FieldType.LABEL },
    
    // Row 9+: Data rows
    { id: 'data1', row: 9, col: 1,
      value: 'JOHN DOE', length: 30, type: FieldType.DISPLAY },
    { id: 'amount1', row: 9, col: 35,
      value: '$1,234.56', length: 15, type: FieldType.DISPLAY }
  ]
};
```

## Alignment Best Practices

### Left-Aligned Fields (Standard)
```
Description: TEST_DESC_____________________________________
Full name:   TEST_NAME_____________________________________
```

### Right-Aligned Fields (Numbers/Currency)
```
Quantity:    __________10
Amount:      __$1,234.56
```

### Center-Aligned (Headers/Titles)
```
                *** MAIN MENU ***
```

## Visual Spacing Guidelines

### Vertical Spacing
- **Dense layout**: 1 row between fields
- **Standard layout**: 1 row between fields, 2 rows between sections
- **Spacious layout**: 2 rows between fields

### Horizontal Spacing
- **Label to field**: 3-5 columns
- **Field to field (same row)**: 3-5 columns
- **Left margin**: Usually 1-5 columns

## Color Zones (Optional Enhancement)

While maintaining green as primary:

```
Row 1-4   : Header zone    (#00FF00 - bright green)
Row 5-21  : Content zone   (#00FF00 - bright green)
Row 22-24 : Footer zone    (#00FF00 - bright green)

Special colors:
- Errors:   #FF0000 (red)
- Warnings: #FFFF00 (yellow)
- Emphasis: #00FFFF (cyan)
```

## Testing Your Layout

Use this checklist:

- [ ] All fields fit within 80 columns
- [ ] Content fits within 24 rows
- [ ] Labels don't overlap fields
- [ ] Fields don't overlap each other
- [ ] Tab order is logical (top to bottom, left to right)
- [ ] Field lengths match data requirements
- [ ] Header information is complete
- [ ] Footer PF keys are defined
- [ ] Underscore padding shows correctly
- [ ] Text aligns as intended

## Quick Reference: Common Positions

```
Standard label column:     1
Standard field column:     16 (after 15-char label space)

Short label column:        1
Short field column:        12 (after 10-char label space)

Multi-field columns:
  First field:             6, 10, 15, or 20
  Second field:            40-45
  Third field:             55-65

Footer PF keys:            1

Right-aligned info:        
  Date:                    65-80
  Time:                    65-80
  Page:                    65-80
  Balance:                 55-80
```

## Pro Tips

1. **Use a character counter** - Each character = 1 column
2. **Sketch first** - Draw your layout on paper before coding
3. **Test with max data** - Use longest possible values to verify fit
4. **Align consistently** - Pick column positions and reuse them
5. **Leave margins** - Don't use columns 79-80 for critical data
6. **Group related fields** - Keep logical fields together
7. **Use blank rows** - Separate sections for readability

## Example: Customer Screen Layout

```
Row  Columns 1-80
───  ───────────────────────────────────────────────────────────────────────────
1    SS6T-6                        M   B   E   S                    2023-10-11
2    T21                      CUSTOMER INFORMATION                   11:08:05
3    Received Type: L  (C-counter,F-fax,M-mail,N-NIC,I-COS/Inter)    Page 1/1
4    Cust/DeptID: __________                                     BALANCE: 0.00
5    
6    CUSTOMER INFORMATION
7    DOC. TYPE: C                                        MAIL CODE: __________
8    
9    Description: TEST_DESC_________________________________________________
10   Full name:   TEST_NAME_________________________________________________
11   Mail-To Name: TEST_NAME________________________________________________
12   Care-of Name: TEST_CARE_OF_NAME_______________________________________
13   Street:      TEST_ST___________________________________________________
14                ___________________________________________________________
15   City: TEST_CITY__________________  St: MD    ZIP: 21214______
16   Country:     ___________________________________________________________
17   Telephone: 111-222-3333______________          Fax: ___-___-____
18   e-mail:    _____________________________________________________________
19   
20   
21   
22   
23   PF: 1-HELP  3-END  11-NXT
24   
```

---

**Remember**: The key to great mainframe screens is consistency and precision. Every character counts!

