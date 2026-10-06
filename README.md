# SCSCO College Digital Platform
> **Enterprise Academic ERP & Unified Digital Campus Ecosystem**  
> *Shri Chhatrapati Shivaji College of Engineering & Technology, Pune (Estd. 1998)*  
> *NAAC A+ Accredited (3.48 CGPA) | Affiliated with Savitribai Phule Pune University (SPPU) | DTE Code: EN-6278*

---

## 1. Executive Summary & Objective

The **SCSCO College Digital Platform** is a full-featured, production-ready enterprise campus management system designed to digitize every dimension of higher education operations. Conforming strictly to the Detailed Project Report (DPR), this solution features a public college portal, role-based multi-tier dashboards, academic administration, examination processing, online fee collections, digital certificate issuance with verification QR codes, and institutional analytics.

---

## 2. System Architecture & Modules

The platform consists of 24 core interconnected functional modules:

1. **Modern Public College Website**: Responsive, CMS-driven portal with hero slider, dynamic notices marquee, department explorer, online admissions application, events calendar, placement reports, and virtual tour.
2. **Student Portal**:
   - Academic Dashboard, Today's lecture schedule, Shortage alert (<75%)
   - Student Profile & Academic Dossier
   - Digital Smart ID Card with cryptographic QR code verification
   - Subject-wise attendance tracker
   - Weekly timetable
   - Assignments & submissions workflow with faculty grading feedback
   - Study materials & lecture notes repository
   - Examination schedule & instant printable Hall Ticket (Admit Card) generator
   - Semester marksheet with SGPA & CGPA calculation
   - Fee payment portal with demo gateway simulation & official printable receipts
   - Certificate request portal (Bonafide, Leaving, Character) with QR tokens
   - Campus recruitment drives & 1-click application status tracking
3. **Parent Portal**: Linked ward monitoring of attendance, marks, pending fee installments, teacher contacts, and circulars.
4. **Faculty Portal**: Class assignment, batch attendance tool with 1-click submission, assignment creator, marks entry, and department notices.
5. **HOD Portal**: Department student strength, faculty teaching workload allocation (12-16 hrs/week), attendance shortage tracking, and results analytics.
6. **Principal Dashboard**: Executive analytics featuring **Recharts** visualizations (department student strength, monthly attendance trends, 4-year salary packages, and fee revenue realization).
7. **Super Admin / Module Officer Portal**:
   - Online admissions processing (Approve / Reject with remarks)
   - Student & Faculty directory
   - Certificate approval & digital issue
   - Placement drive publisher
   - Central library circulation desk (OPAC, Issue & Return tracking)
   - CMS (Notices, Events, News, Gallery)
   - Grievance Redressal committee ticket resolution
   - Immutable security audit logs
8. **Campus AI Assistant**: Zero-cost knowledge-grounded assistant for admissions, eligibility, cutoffs, fee structures, and syllabus with optional Gemini API enhancement.

---

## 3. Technology Stack

- **Frontend**: Next.js / React 19, TypeScript, Tailwind CSS
- **Design System**: Poppins typography, WCAG AA accessibility, zero-pill metadata discipline, responsive layout
- **Analytics Visualizations**: Recharts (BarChart, LineChart, AreaChart, PieChart)
- **Database & Schema**: PostgreSQL, Prisma ORM (`prisma/schema.prisma`)
- **Icons**: Lucide React
- **Validation & Security**: Role-Based Access Control (RBAC), audit logging, parameterization, XSS mitigation

---

## 4. Demo Login Credentials (8 Role Profiles)

All accounts can be tested instantly using the **1-Click Demo Portal Switcher** inside the application, or via credentials:

| Role | Name | Email | Password |
|---|---|---|---|
| **Super Admin** | Shrikant Shinde | `admin@scsco.edu.in` | `scsco@2026` |
| **Principal** | Dr. Arvind Deshmukh | `principal@scsco.edu.in` | `scsco@2026` |
| **HOD (Computer)** | Dr. Sunita Kulkarni | `hod.comp@scsco.edu.in` | `scsco@2026` |
| **Faculty (DBMS)** | Prof. Rajesh Patil | `faculty.comp@scsco.edu.in` | `scsco@2026` |
| **Module Officer** | Vikram Joshi (Registrar) | `officer@scsco.edu.in` | `scsco@2026` |
| **Student** | Rahul Sharma (Roll 42) | `rahul.sharma@scsco.edu.in` | `scsco@2026` |
| **Parent** | Suresh Sharma | `parent.sharma@gmail.com` | `scsco@2026` |
| **Alumni** | Amit Jadhav (Sr. SDE) | `alumni.amit@scsco.edu.in` | `scsco@2026` |

---

## 5. Local Setup & Production Build

### Prerequisites
- Node.js (v18 or v20+)
- npm or pnpm

### Installation
```bash
# 1. Install dependencies
npm install

# 2. Generate Prisma Client
npx prisma generate

# 3. Run database migrations (when connecting to PostgreSQL)
npx prisma migrate dev --name init

# 4. Seed initial database records
npx tsx prisma/seed.ts

# 5. Start Development Server
npm run dev
```

### Production Build
```bash
npm run build
```

---

## 6. Project Structure

```
├── prisma/
│   ├── schema.prisma          # Comprehensive PostgreSQL relational models
│   └── seed.ts                # Production seed script
├── src/
│   ├── components/
│   │   ├── auth/              # AuthModal & role switcher
│   │   ├── common/            # Button, Badge, Modal, DataTable, StatCard, AI Assistant
│   │   ├── layout/            # PublicNavbar, PublicFooter, PortalHeader, PortalSidebar
│   │   ├── portals/           # Student, Parent, Faculty, HOD, Principal, Admin Portals
│   │   └── public/            # Public Website sections & interactive admissions
│   ├── context/
│   │   └── CollegeContext.tsx # Central state management & audit logger
│   ├── data/
│   │   └── mockDatabase.ts    # Rich realistic seed records
│   ├── services/
│   │   └── aiService.ts       # Campus AI Assistant service
│   ├── types/
│   │   └── index.ts           # Unified TypeScript interfaces
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── package.json
└── tsconfig.json
```

---

## 7. License & Compliance
This software is developed for **Shri Chhatrapati Shivaji College of Engineering & Technology (SCSCO)**. Compliant with AICTE, DTE Maharashtra, and NAAC IQAC data governance benchmarks.
