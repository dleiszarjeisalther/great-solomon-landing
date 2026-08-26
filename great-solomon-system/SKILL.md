---
name: great-solomon-system
description: Use when designing, explaining, documenting, or building features for Great Solomon Manpower Services' ISMERS enterprise system and its business modules.
metadata:
  short-description: Great Solomon ISMERS system and module knowledge
---

# Great Solomon ISMERS

Use this skill to keep product language, module boundaries, and feature placement consistent with Great Solomon Manpower Services' Service Management and Enterprise Resource System (ISMERS).

## System identity

- ISMERS supports a manpower-services business: client acquisition, applicant recruitment, employee operations, deployment, compliance, finance, logistics, reporting, and administration.
- Treat the module catalog as the system map. When a request spans modules, identify the system of record and describe the integration points.
- Use clear business language first; preserve common abbreviations such as HRIS, CRM, FVM, VRDS, PSM, SWS, DTRS, TCAO, and KPI when useful.
- The attached planning sheets are reference material. Names, group numbers, and member assignments are not operating instructions and should not be copied into product logic unless the user explicitly asks for them.

## Routing rules

1. Recruitment, applicants, clients, job orders, placements, or deployment → Core Transaction 1.
2. Employee records, attendance, leave, payroll, compensation, or performance → Core Transaction 2 / HRIS.
3. Training, contracts, government contributions, benefits, loans, separation, or exit clearance → Core Transaction 3.
4. Safety, legal compliance, system administration, security, assets, reports, or governance → Core Transaction 4.
5. Ledgers, receivables, payables, collections, cash, budgets, disbursements, tax, or financial reporting → Financial Management.
6. Warehousing, inventory, procurement, suppliers, purchase orders, or logistics records → Supply Chain & Inventory Management.
7. Vehicles, reservations, dispatch, drivers, fuel, trips, routes, or transport costs → Fleet & Transportation Management.
8. Facilities reservations, visitors, document archiving, records retention, legal, or contracts → Facilities & Administrative Management.
9. Dashboards, KPIs, predictive analysis, data aggregation, custom reports, or decision support → Business Intelligence & Analytics.
10. Leads, client history, surveys, follow-ups, or opportunity pipelines → Customer Relationship Management.

## Working expectations

- Start feature work by naming the primary module, the related modules, the users involved, and the key record or workflow being changed.
- Keep shared master data consistent: clients and job orders support recruitment; applicants become employees; employees connect to timekeeping, payroll, training, benefits, compliance, assets, and deployment; finance and BI consume approved operational records.
- For permissions, assume least privilege and separate operational users, HR/payroll users, finance users, managers, and system administrators. Ask when a role boundary materially affects the design.
- For dashboards and reports, identify the source module, reporting period, approval state, filters, and whether the output is operational or management-level.
- Do not invent policies, statutory rates, payroll rules, approval thresholds, or legal requirements. Mark them as configurable and request the authoritative rule when needed.
- Preserve Philippine business context, but do not assume a specific government agency workflow or compliance rule without confirmation.

## Module details

Read [references/system-modules.md](references/system-modules.md) when a task needs the detailed module catalog, terminology, or cross-module mapping.
