/**
 * Field types supported by the mainframe terminal
 */
export enum FieldType {
  DISPLAY = 'DISPLAY',      // Read-only display field
  INPUT = 'INPUT',          // Editable input field
  LABEL = 'LABEL',          // Static label text
  PROTECTED = 'PROTECTED'   // Protected field (not editable)
}

/**
 * Field definition for a single field on the screen
 */
export interface FieldDefinition {
  id: string;               // Unique field identifier
  row: number;              // Row position (1-based)
  col: number;              // Column position (1-based)
  label?: string;           // Field label (optional)
  labelCol?: number;        // Label column position (if different from field)
  value: string;            // Field value
  length: number;           // Maximum field length
  type: FieldType;          // Field type
  color?: string;           // Optional color override
  padChar?: string;         // Character to pad with (default: underscore)
  tabIndex?: number;        // Tab order
}

/**
 * PF Key (Function Key) definition
 */
export interface PFKeyDefinition {
  key: number;              // PF key number (1-24)
  label: string;            // Display label
  action: string;           // Action identifier
  enabled: boolean;         // Whether key is enabled
}

/**
 * Header information displayed at the top of the screen
 */
export interface ScreenHeader {
  systemId: string;         // System identifier (top-left)
  menuItems?: string[];     // Menu indicators (M B E S)
  date?: string;            // Date display (top-right)
  time?: string;            // Time display (top-right)
  transactionId?: string;   // Transaction ID (e.g., T21)
  receivedType?: string;    // Received type line
  pageNumber?: number;      // Current page number
  totalPages?: number;      // Total pages
  balance?: string;         // Balance or other right-aligned info
}

/**
 * Footer information with PF key indicators
 */
export interface ScreenFooter {
  pfKeys: PFKeyDefinition[];
}

/**
 * Complete screen definition
 */
export interface MainframeScreen {
  screenId: string;         // Unique screen identifier
  title: string;            // Screen title/description
  header: ScreenHeader;     // Header information
  fields: FieldDefinition[]; // All fields on the screen
  footer: ScreenFooter;     // Footer with PF keys
  docType?: string;         // Document type (e.g., "C" for customer)
  mailCode?: string;        // Mail code field
  description?: string;     // Description field
}

/**
 * Screen navigation event
 */
export interface NavigationEvent {
  fromScreen: string;
  toScreen: string;
  pfKey?: number;
  data?: any;
}

/**
 * Field validation result
 */
export interface ValidationResult {
  isValid: boolean;
  errorMessage?: string;
  fieldId: string;
}

