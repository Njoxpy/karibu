# Company Management Karibu

## 1. Visual Theme & Atmosphere

A professional company management system should communicate **trust, structure, efficiency, and operational clarity**.

Since the company brand color is **blue**, the design should use a clean enterprise-first interface inspired by Airtable, but optimized for dashboards, employee records, reports, departments, payroll, approvals, and internal workflows.

The goal is:

**“Corporate clarity with modern usability”**

### Key Characteristics

- Clean white workspace for data visibility
- Strong blue brand identity for trust and authority
- Enterprise dashboard structure
- Professional typography with high readability
- Soft shadows with minimal visual noise
- Rounded but serious UI (not overly playful)
- Designed for tables, forms, reports, and admin panels

---

# 2. Color Palette & Roles

## Primary Colors

### Primary Blue

`#1565D8`

Used for:

- Primary buttons
- Sidebar active states
- Links
- Status highlights
- Main brand identity

---

### Deep Navy

`#0F172A`

Used for:

- Main text
- Headers
- Dashboard titles
- Sidebar headings

---

### White

`#FFFFFF`

Used for:

- Main background
- Cards
- Tables
- Modals

---

### Light Surface

`#F8FAFC`

Used for:

- Secondary surfaces
- Table rows
- Hover states
- Dashboard sections

---

## Semantic Colors

### Success Green

`#16A34A`

### Warning Orange

`#F59E0B`

### Danger Red

`#DC2626`

### Info Blue

`#2563EB`

---

## Neutral Colors

### Border Gray

`#E2E8F0`

### Secondary Text

`#475569`

### Weak Text

`#64748B`

### Disabled

`#CBD5E1`

---

# 3. Typography Rules

## Font Families

### Primary Font

```css
Inter, -apple-system, system-ui, Segoe UI, Roboto, sans-serif
```

### Display Font

```css
Inter
```

Clean, modern, professional, excellent for management systems.

---

# 4. Typography Hierarchy

| Role            | Size | Weight | Line Height |
| --------------- | ---: | -----: | ----------: |
| Dashboard Hero  | 40px |    700 |         1.2 |
| Page Title      | 32px |    600 |        1.25 |
| Section Heading | 24px |    600 |         1.3 |
| Card Title      | 20px |    600 |         1.3 |
| Table Header    | 16px |    600 |         1.3 |
| Body Large      | 16px |    400 |         1.5 |
| Body Standard   | 14px |    400 |         1.5 |
| Button Text     | 14px |    500 |         1.3 |
| Caption         | 12px |    400 |         1.4 |

---

# 5. Component Styling

## Buttons

### Primary Button

```css
Background: #1565D8
Text: White
Padding: 14px 24px
Border Radius: 12px
Font Weight: 500
```

Used for:

- Save
- Approve
- Submit
- Create Employee
- Generate Report

---

### Secondary Button

```css
Background: White
Border: 1px solid #E2E8F0
Text: #0F172A
Radius: 12px
```

Used for:

- Cancel
- Export
- Filter
- View Details

---

## Cards

```css
Background: White
Border: 1px solid #E2E8F0
Radius: 16px
Shadow: Soft professional shadow
```

Used for:

- KPI widgets
- Department summaries
- Employee profile panels

---

## Tables

```css
Header Background: #F8FAFC
Row Hover: #F1F5F9
Border: #E2E8F0
```

Very important for management systems.

---

## Inputs

```css
Height: 48px
Border Radius: 12px
Border: 1px solid #CBD5E1
Focus Border: #1565D8
```

---

# 6. Layout Rules

## Sidebar

```css
Width: 280px
Background: White
Border Right: 1px solid #E2E8F0
```

Used for:

- Dashboard
- Employees
- Departments
- Payroll
- Reports
- Settings

---

## Top Navigation

```css
height: 72px Clean white with subtle border;
```

---

## Content Spacing

8px system

```text
8 / 16 / 24 / 32 / 48 / 64
```

---

# 7. Shadow System

## Primary Shadow

```css
rgba(15, 23, 42, 0.06) 0px 4px 12px
```

## Elevated Modal Shadow

```css
rgba(15, 23, 42, 0.10) 0px 8px 24px
```

Minimal and professional.

---

# 8. Do’s and Don’ts

## Do

- Use blue for authority and trust
- Prioritize readability over decoration
- Keep dashboards clean
- Make tables easy to scan
- Use whitespace generously
- Keep actions obvious

## Don’t

- Use too many colors
- Add flashy gradients
- Use oversized shadows
- Make admin screens playful
- Over-design data-heavy pages
