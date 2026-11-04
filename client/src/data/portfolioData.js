/**
 * vbrion Portfolio - 26 Production Systems & Enterprise Applications
 * Extracted from Complete Project Documentation & Technical Reports
 */

export const portfolioCategories = [
  { id: 'all', label: 'All Systems (26)' },
  { id: 'flagship', label: 'Flagship Systems' },
  { id: 'campus-erp', label: 'Campus & Institutional ERP' },
  { id: 'specialized-tools', label: 'Desktop & Specialized Tools' },
  { id: 'fintech-realtime', label: 'Fintech & Real-Time' },
  { id: 'enterprise-hr', label: 'Enterprise HR & Payroll' },
  { id: 'analytics-frontend', label: 'Analytics & Foundations' },
];

export const portfolioProjects = [
  // ==========================================
  // PART I · FLAGSHIP PRODUCTION SYSTEMS
  // ==========================================
  {
    id: 'dote-admissions-portal',
    title: 'DOTE Admissions Portal 2.0',
    category: 'flagship',
    industryTag: 'Government Infrastructure · Tamil Nadu',
    outcome: 'Digitized statewide polytechnic admissions across 118+ institutions, processing 35,330+ registered students and 27,393+ submitted applications with 100% audit compliance.',
    thumbnail: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
    accentColor: '#4F46E5',
    badgeText: 'GOVERNMENT PRODUCTION · 118+ COLLEGES',
    summary: 'Directorate of Technical Education — Integrated Online Admission Management System digitizing student registration, document verification, quota allocation, and state-wide administrative reporting.',
    challenge: 'State-wide polytechnic admissions were historically bottlenecked by manual paperwork across 118+ government and affiliated colleges, leading to long queues, verification delays, and opaque seat allocation.',
    approach: 'Engineered a highly resilient 3-tier portal (Public/Student, College Panel, and State Admin Command Center) backed by MySQL 8 with connection pooling, Nginx reverse proxying, and PM2 clustering.',
    solution: 'Built a 9-step progressive student application workflow with dynamic quota validation, certificate checklist verification, role-scoped college admission dashboards, and a 12-sheet automated state reporting engine with 65,081 admitted records.',
    results: [
      { metric: '118+', label: 'State Institutions Onboarded' },
      { metric: '35,330+', label: 'Registered Students' },
      { metric: '65,081', label: 'Admitted Records Processed' }
    ],
    techUsed: ['React 18', 'Vite 5', 'Tailwind CSS 4', 'Node.js 20', 'Express 4', 'MySQL 8', 'Docker', 'Nginx', 'PM2', 'Certbot SSL']
  },
  {
    id: 'lifeline-hms',
    title: 'Lifeline HMS — Hospital Management System',
    category: 'flagship',
    industryTag: 'Healthcare & Life Sciences',
    outcome: 'Unified 9 distinct healthcare role families over a 50+ table MySQL data model, integrating an Orthanc DICOM radiology viewer and sub-200ms bedside telemetry.',
    thumbnail: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80',
    accentColor: '#0284C7',
    badgeText: 'HEALTHCARE PLCM · 9 ROLE FAMILIES',
    summary: 'Enterprise Patient Life-Cycle Management (PLCM) platform spanning OPD token queues, IPD bed allocation, Doctor Station SOAP notes, lab diagnostic catalog, pharmacy POS, and unified discharge billing.',
    challenge: 'Tertiary hospitals suffered from isolated legacy systems where radiology imaging, pharmacy stock dispensation, nursing vitals, and billing operated in uncoordinated silos.',
    approach: 'Constructed an event-driven cluster architecture using Node.js and Express 5, connecting to a centralized 50+ table relational model with Orthanc DICOM server integration for browser-native radiology viewing.',
    solution: 'Delivered an integrated hospital cockpit featuring e-prescriptions, early warning nursing score calculations, automated lab PDF reports with reference range flags, and unified billing reconciling consultations, pharmacy, and bed occupancy.',
    results: [
      { metric: '9 Roles', label: 'Role-Based Access Hierarchy' },
      { metric: '50+ Tables', label: 'Normalized Relational Data Model' },
      { metric: '100% Native', label: 'Orthanc DICOM Viewer Integration' }
    ],
    techUsed: ['React 19', 'Vite 7', 'Node.js Cluster', 'Express 5', 'MySQL2', 'Orthanc DICOM', 'AG Grid', 'Puppeteer', 'Docker Compose', 'Kubernetes K3s']
  },
  {
    id: 'nec-ems-proctoring',
    title: 'NEC EMS — Secure Exam & Proctoring Platform',
    category: 'flagship',
    industryTag: 'Enterprise Assessment · Nandha College',
    outcome: 'Eliminated remote assessment malpractice via zero-trust server-side evaluation, WebSocket telemetry streams, and an automated 0–100 student Risk Intelligence Engine.',
    thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
    accentColor: '#DC2626',
    badgeText: 'PROCTORING & ANTI-MALPRACTICE',
    summary: 'Hardened online examination and proctoring system featuring live WebSocket telemetry, screen recording piped to MongoDB GridFS, DVR session replay, and automated penalty scoring.',
    challenge: 'Remote academic evaluations were plagued by unauthorized tab-switching, DevTools inspection of answer payloads, and lack of verifiable evidentiary audit trails during disputes.',
    approach: 'Enforced 100% server-side answer evaluation where client devices receive only question prompts, while background WebSocket streams monitor focus loss, clipboard events, and window resizing.',
    solution: 'Created a DVR-style Replay Center synchronizing webcam snapshots with timestamped violation markers, accompanied by an automated Risk Intelligence Engine scoring student integrity and generating 19 RBAC-scoped reports.',
    results: [
      { metric: '0–100', label: 'Real-Time Risk Scoring Engine' },
      { metric: '100%', label: 'Server-Side Answer Evaluation' },
      { metric: '19 Reports', label: 'Multi-Format Export Formats' }
    ],
    techUsed: ['Node.js', 'React', 'MongoDB', 'Redis', 'WebSockets', 'GridFS', 'Docker', 'JWT', 'Tailwind CSS']
  },
  {
    id: 'hotel-management-booking-system',
    title: 'Hotel Management & Reservation Booking System',
    category: 'flagship',
    industryTag: 'Hospitality & Commercial Operations',
    outcome: 'Engineered a full-stack public booking and internal operations platform with atomic MongoDB transactions, idempotent Razorpay webhooks, and verified k6 load endurance.',
    thumbnail: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
    accentColor: '#D97706',
    badgeText: 'HOTEL MANAGEMENT · 6-ROLE RBAC',
    summary: 'Dual-engine hotel management system unifying guest reservation booking with internal property management (reception, housekeeping, maintenance, and managers).',
    challenge: 'Double-booking race conditions during high-demand festival seasons, lost payments due to unhandled webhook drops, and fragmented housekeeping status updates.',
    approach: 'Designed explicit state machines for room inventory and reservations utilizing atomic MongoDB transactions with session rollbacks, combined with HMAC-verified Razorpay webhook handlers.',
    solution: 'Delivered an intuitive guest booking interface backed by an internal operational suite featuring real-time room cleaning boards, maintenance ticket workflows, durable background queues, and automated CI/CD.',
    results: [
      { metric: '6 Roles', label: 'Granular Operational RBAC' },
      { metric: 'Zero', label: 'Double-Booking Race Anomalies' },
      { metric: '100% Verified', label: 'k6 High-Concurrency Load Tested' }
    ],
    techUsed: ['React 18', 'TypeScript', 'Express', 'MongoDB', 'Razorpay Webhooks', 'Cloudinary', 'Docker', 'k6', 'GitHub Actions']
  },

  // ==========================================
  // PART II · CAMPUS & INSTITUTIONAL ERP / LMS
  // ==========================================
  {
    id: 'neurocampus-ai',
    title: 'NeuroCampus AI — Campus ERP Platform',
    category: 'campus-erp',
    industryTag: 'Campus ERP & Institutional Automation',
    outcome: 'Unified 8 core institutional modules (academics, admissions, attendance, fees, examinations, hostel) with CSV permission RBAC and structured Winston logging.',
    thumbnail: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
    accentColor: '#9333EA',
    badgeText: 'AI-NATIVE CAMPUS ERP',
    summary: 'High-throughput institutional operations platform engineered with MERN architecture, rate limiting (1000 req/min/IP), and automated theme refactoring workflows.',
    challenge: 'Institutions struggling with disconnected spreadsheets, untracked fee reconciliations, and slow administrative report generation across disparate departments.',
    approach: 'Built a modular microservices-inspired architecture with dynamic sidebar rendering based on CSV permission strings, backed by MongoDB 7 with optimized compound indexes.',
    solution: 'Implemented comprehensive student and administrative portals including automated fee receipts, attendance tracking, exam hall ticket generation, and hostel allocation.',
    results: [
      { metric: '8 Modules', label: 'Fully Integrated Institutional Domains' },
      { metric: '1,000/min', label: 'API Route Rate Limiting Defense' },
      { metric: 'Sub-300ms', label: 'P95 Dashboard Load Times' }
    ],
    techUsed: ['React 18.3', 'Express 4', 'MongoDB 7', 'JWT', 'Helmet', 'Winston', 'Tailwind CSS']
  },
  {
    id: 'accredhub-nirf',
    title: 'AccredHub — NIRF Accreditation Management',
    category: 'campus-erp',
    industryTag: 'Academic Accreditation & Governance',
    outcome: 'Centralized institutional NIRF compliance data collection across faculty, research, and infrastructure with real-time KPI progress tracking.',
    thumbnail: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80',
    accentColor: '#0D9488',
    badgeText: 'NIRF ACCREDITATION COCKPIT',
    summary: 'Institutional accreditation platform streamlining data aggregation across academic departments with real-time submission progress radar against compliance parameters.',
    challenge: 'Preparing annual NIRF accreditation data required months of manual cross-department verification, with high risk of missing documentation or calculation errors.',
    approach: 'Engineered an 8-module centralized portal with strict schema validation using Zod and dynamic client hydration via React Query.',
    solution: 'Designed a real-time KPI dashboard displaying module-wise completion percentages, missing documentation alerts, and structured audit export formats.',
    results: [
      { metric: '8 Modules', label: 'NIRF Metric Categories' },
      { metric: '70% Faster', label: 'Institutional Audit Preparation' },
      { metric: '100%', label: 'Document Traceability' }
    ],
    techUsed: ['React 18', 'Express', 'Radix UI', 'Zod', 'React Query', 'Tailwind CSS']
  },
  {
    id: 'academigradepro-feedback',
    title: 'AcademiGradePro — AICTE 360° Feedback Platform',
    category: 'campus-erp',
    industryTag: 'Higher Education Regulatory Compliance',
    outcome: 'Standardized AICTE multi-source faculty evaluations (Student, Peer, HOD, Self) across 6 weighted categories with 28-table normalized MySQL schema.',
    thumbnail: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80',
    accentColor: '#4338CA',
    badgeText: 'AICTE 360° FACULTY EVALUATION',
    summary: 'Multi-stakeholder performance management system featuring anonymous evaluation sessions, batch Excel imports, and automated 360° scoring engines.',
    challenge: 'AICTE mandated 360-degree faculty evaluations, but colleges lacked confidential student feedback mechanisms and struggled with category-weighted score aggregation.',
    approach: 'Constructed a 28-table normalized relational schema enforcing foreign key integrity, coupled with 12-round bcrypt password encryption and IP audit logging.',
    solution: 'Built anonymous student rating forms, peer reviews, and HOD appraisals that feed into a weighted calculation engine producing downloadable executive faculty scorecards.',
    results: [
      { metric: '28 Tables', label: 'Normalized MySQL Relational Schema' },
      { metric: '5 Roles', label: 'RBAC (Admin, Principal, HOD, Faculty, Student)' },
      { metric: '100%', label: 'AICTE Statutory Compliance' }
    ],
    techUsed: ['React 18', 'TypeScript', 'Express', 'MySQL 8', 'JWT', 'Bcrypt', 'ExcelJS']
  },
  {
    id: 'omnilearn-erp',
    title: 'OmniLearn ERP & Learning Management Hub',
    category: 'campus-erp',
    industryTag: 'EdTech & University ERP',
    outcome: 'Deployed an all-in-one educational resource planning and LMS platform backed by Supabase PostgreSQL with database-enforced Row Level Security.',
    thumbnail: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80',
    accentColor: '#2563EB',
    badgeText: 'SUPABASE BAAS · INSTITUTIONAL ERP',
    summary: 'Unified digital ecosystem connecting admissions, student fees, library catalogs, exam administration, and course content delivery.',
    challenge: 'Managing student assignments, fee payments, and attendance across multiple incompatible portals caused student confusion and high administrative overhead.',
    approach: 'Leveraged Supabase PostgreSQL with strict Row Level Security (RLS) policies ensuring students, guardians, teachers, and admins only access permitted rows.',
    solution: 'Constructed an integrated portal featuring automated fee invoicing, digital library book reservations, online assignment submission, and course progress tracking.',
    results: [
      { metric: '100% RLS', label: 'Database-Layer Security Policies' },
      { metric: 'Unified', label: 'ERP + LMS Single Sign-On' },
      { metric: 'Real-Time', label: 'Attendance & Fee Sync' }
    ],
    techUsed: ['React 18', 'Vite', 'TypeScript', 'Supabase', 'PostgreSQL RLS', 'Tailwind CSS']
  },
  {
    id: 'campuscore-ams',
    title: 'CampusCore — Academic Management System',
    category: 'campus-erp',
    industryTag: 'Academic Planning & Telemetry',
    outcome: 'Centralized curriculum planning, Course Outcome (CO-PO) mapping, and multi-mode attendance (Manual/QR/Biometric) with real-time notification feeds.',
    thumbnail: 'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?auto=format&fit=crop&w=800&q=80',
    accentColor: '#059669',
    badgeText: 'CURRICULUM & CO-PO MAPPING',
    summary: 'Serverless client-server academic management platform centralizing syllabus planning, outcome mapping, attendance automation, and executive reporting.',
    challenge: 'NBA/NAAC accreditation mandates rigorous Course Outcome to Program Outcome (CO-PO) attainment calculations, which faculty previously calculated by hand.',
    approach: 'Formulated automated attainment algorithms calculating student assessment performance directly against mapped course competencies.',
    solution: 'Delivered an administrative cockpit with multi-mode attendance support (including QR codes), instant student SMS/email notifications, and dynamic PDF/Excel grade sheets.',
    results: [
      { metric: 'Automated', label: 'CO-PO Attainment Computation' },
      { metric: '3 Modes', label: 'Attendance (Manual, QR, Biometric)' },
      { metric: 'Instant', label: 'Event-Driven Notification Center' }
    ],
    techUsed: ['React 18', 'Vite', 'TypeScript', 'Supabase', 'Shadcn UI', 'Tailwind CSS']
  },
  {
    id: 'fusion-lms',
    title: 'Fusion LMS — Enterprise ERP & Exam Suite',
    category: 'campus-erp',
    industryTag: 'Higher Education LMS',
    outcome: 'Engineered a unified ERP + LMS spanning admissions, timetabling, virtual classrooms, question bank authoring, hall ticket issuance, and revaluations.',
    thumbnail: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=800&q=80',
    accentColor: '#7C3AED',
    badgeText: 'END-TO-END EXAM LIFECYCLE',
    summary: 'Role-specific institutional platform serving Super Admins, Principals, HODs, Faculty, Students, and Parents with automated document generation.',
    challenge: 'Managing exam question papers, student seat allocations, revaluations, and transcripts required tedious manual work that delayed semester results.',
    approach: 'Architected a modular Node/Express and TypeScript backend with dynamic document rendering engines using XLSX and PDFKit.',
    solution: 'Implemented digital question bank repositories, automated hall ticket generation with barcoded verification, online grade books, and instant parent progress alerts.',
    results: [
      { metric: '6 Portals', label: 'Role-Specific Institutional Interfaces' },
      { metric: 'Automated', label: 'Hall Ticket & Transcript Generation' },
      { metric: 'Full Lifecycle', label: 'Admissions through Revaluation' }
    ],
    techUsed: ['React 18', 'Node.js', 'Express', 'TypeScript', 'Framer Motion', 'XLSX', 'Tailwind CSS']
  },
  {
    id: 'exaura-ems',
    title: 'Exaura — Exam Management Suite SPA',
    category: 'campus-erp',
    industryTag: 'Polytechnic & Higher Ed Assessments',
    outcome: 'Built a full assessment-lifecycle SPA featuring institutional onboarding, faculty masters, and timetable scheduling powered by an in-browser mock-API interceptor.',
    thumbnail: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80',
    accentColor: '#EA580C',
    badgeText: 'MOCK-API INTERCEPTOR ARCHITECTURE',
    summary: 'High-fidelity Single Page Application simulating a complete REST backend over localStorage with Zod validation and approval-gated institution onboarding.',
    challenge: 'Demonstrating complex multi-college examination scheduling and approval workflows to university leadership without requiring local database installations.',
    approach: 'Constructed an in-memory and localStorage REST interceptor that handles full CRUD, simulated latency, authentication tokens, and validation cascades.',
    solution: 'Designed an intuitive timetable scheduling matrix with room allocation overlays, subject prerequisites, and global admin vetting gates.',
    results: [
      { metric: 'Zero Setup', label: 'Client-Side Mock-API Over LocalStorage' },
      { metric: '100% Zod', label: 'Schema-Validated Input Payloads' },
      { metric: 'Approval Gate', label: 'Institutional Onboarding Workflow' }
    ],
    techUsed: ['React 18', 'Tailwind CSS 3', 'React Router 6', 'Framer Motion', 'Zod']
  },
  {
    id: 'assessmatrix-ems',
    title: 'AssessMatrix — Exam Management & Collision Engine',
    category: 'campus-erp',
    industryTag: 'Engineering College Examination Operations',
    outcome: 'Engineered an advanced timetable scheduling engine with automated room and faculty collision detection, bulk data sync, and student result analytics.',
    thumbnail: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
    accentColor: '#0891B2',
    badgeText: 'TIMETABLE COLLISION DETECTION',
    summary: 'Production-ready examination management platform for Polytechnic and Engineering colleges managing enrollment, room allocations, invigilation duty, and results.',
    challenge: 'Scheduling hundreds of concurrent examinations across dozens of departments frequently created double-booked halls and overlapping faculty invigilation assignments.',
    approach: 'Developed an interval-tree collision detection algorithm that evaluates hall capacity, faculty availability, and student subject conflicts in real time.',
    solution: 'Built high-performance AG-Grid tables for rapid student grade entry, bulk CSV/Excel imports, and real-time Recharts dashboards for passing rate analytics.',
    results: [
      { metric: 'Zero', label: 'Room & Faculty Collision Conflicts' },
      { metric: 'AG-Grid', label: 'High-Concurrency Grade Entry' },
      { metric: 'Instant', label: 'Semester Pass Rate Analytics' }
    ],
    techUsed: ['React 18', 'Node.js', 'Express', 'MySQL2', 'JWT', 'AG-Grid', 'Recharts']
  },
  {
    id: 'college-management-system-cms',
    title: 'College Management System (CMS) / SF-ERP',
    category: 'campus-erp',
    industryTag: 'SaaS Institutional ERP · 100k+ Users Target',
    outcome: 'Architected an all-in-one institutional ERP with algorithmic exam-seat allocation (Horizontal, Vertical, Zigzag, Wave) and Kubernetes pod autoscaling.',
    thumbnail: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80',
    accentColor: '#16A34A',
    badgeText: 'MASTER CONTROL PLANE ARCHITECTURE',
    summary: 'Large-scale institutional SaaS ERP unifying student admissions, faculty payroll, financial ledgers, and exams behind a centralized Master Control Plane (MCP).',
    challenge: 'Preventing exam hall collusion between adjacent students while scaling infrastructure to support 100,000+ simultaneous students during result publications.',
    approach: 'Built a Master Control Plane pattern standardizing security, logging, and error handling, complemented by Kubernetes manifests for horizontal pod autoscaling.',
    solution: 'Implemented automated exam hall seating distribution supporting Zigzag and Wave patterns to ensure no two students of the same department sit adjacently.',
    results: [
      { metric: '4 Patterns', label: 'Seating (Horizontal, Vertical, Zigzag, Wave)' },
      { metric: '100k+ Scale', label: 'Target Concurrency with K8s Pods' },
      { metric: 'Anti-Abuse', label: 'Rate Limiting & Suspicious IP Blocking' }
    ],
    techUsed: ['React 18', 'Node.js', 'Express 5', 'MySQL 8', 'Docker', 'Kubernetes', 'Redis']
  },

  // ==========================================
  // PART III · DESKTOP & SPECIALIZED TOOLS
  // ==========================================
  {
    id: 'leo-performance-tracker',
    title: 'LEO — Student Coding Performance Tracker',
    category: 'specialized-tools',
    industryTag: 'Desktop Software · Nandha Engineering College',
    outcome: 'Automated LeetCode problem fetching and daily contest gap analysis for 620 students, tracking 65,834+ solved problems with 100% offline SQLite storage.',
    thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
    accentColor: '#F59E0B',
    badgeText: 'ELECTRON DESKTOP APP · 620 STUDENTS',
    summary: 'Offline-first desktop application replacing error-prone Excel tracking for department placement cells. Operates completely locally with embedded Node.js backend and portable .exe build.',
    challenge: 'Placement coordinators spent hours manually checking LeetCode profiles of 620 students every week to prepare departmental aptitude reports.',
    approach: 'Built an Electron and React desktop application bundling an embedded Express server on localhost:3001 and a zero-config SQLite local database.',
    solution: 'Features automated profile scraping, day-over-day delta tracking, 7-day pre-contest baseline analysis, and gamified departmental leaderboards with Excel export.',
    results: [
      { metric: '620', label: 'Students Tracked Daily' },
      { metric: '65,834', label: 'All-Time Solved Problems Logged' },
      { metric: 'Zero Cloud', label: '100% Local SQLite Persistence' }
    ],
    techUsed: ['Electron', 'Electron-Builder', 'React', 'Vite', 'Node.js', 'Express', 'SQLite', 'Multer']
  },
  {
    id: 'mattresspro-forecast',
    title: 'MattressPro Forecast — Manufacturing Analytics',
    category: 'specialized-tools',
    industryTag: 'Industrial Analytics & Manufacturing',
    outcome: 'Engineered a daily production output forecasting engine correlating real-time worker attendance and material constraints, with dedicated shop-floor TV Mode.',
    thumbnail: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
    accentColor: '#D97706',
    badgeText: 'BOTTLENECK THEORY ENGINE · TV MODE',
    summary: 'Industrial analytics dashboard solving factory output volatility by applying Theory of Constraints across age-band workforce productivity and raw material stock.',
    challenge: 'Mattress factories suffered unpredictable daily completion volumes due to fluctuating worker attendance, material shortages, and lack of shop-floor visibility.',
    approach: 'Formulated an algorithmic model evaluating the tighter constraint between age-weighted worker efficiency and available spring/foam stock.',
    solution: 'Delivered an executive workstation view alongside a high-visibility, dark-themed "TV Mode" that auto-scrolls metrics across shop-floor overhead monitors without human intervention.',
    results: [
      { metric: 'Shop Floor', label: 'Dedicated Dark-Themed TV Display Mode' },
      { metric: 'Predictive', label: 'Bottleneck Theory Output Forecasting' },
      { metric: 'Zero-Latency', label: 'Local-First Persistence Engine' }
    ],
    techUsed: ['React 18', 'Vite', 'Express 5', 'Shadcn UI', 'Radix UI', 'Recharts', 'Tailwind CSS']
  },

  // ==========================================
  // PART IV · FINTECH, COMMERCE & REAL-TIME
  // ==========================================
  {
    id: 'irispay-biometric-gateway',
    title: 'IrisPay — Biometric Aadhaar Payment Gateway',
    category: 'fintech-realtime',
    industryTag: 'Fintech & Biometric Payments',
    outcome: 'Integrated biometric Mantra MFS110/MIS100 hardware simulation with the Aadhaar ecosystem, enabling cardless, PIN-less digital transactions for semi-urban inclusion.',
    thumbnail: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80',
    accentColor: '#10B981',
    badgeText: 'AADHAAR / MANTRA BIOMETRIC GATEWAY',
    summary: 'Merchant payment portal featuring a 3-step checkout wizard (Details → Biometric Scan → Settlement), masked Aadhaar privacy compliance, and real-time merchant analytics.',
    challenge: 'Rural and semi-urban merchants struggle with card POS terminals, requiring accessible biometric payment rails compliant with UIDAI data protection rules.',
    approach: 'Designed a hardware interface layer abstracting Mantra scanner capture events with client-side masking of sensitive biometric and identification identifiers.',
    solution: 'Built an intuitive merchant checkout wizard, instant transaction receipt generator, and merchant settlement dashboard with fraud anomaly detection.',
    results: [
      { metric: '3-Step', label: 'Intuitive Transaction Checkout Wizard' },
      { metric: 'Hardware', label: 'Mantra MFS110/MIS100 Scanner Flow' },
      { metric: 'UIDAI Ready', label: 'Masked Aadhaar Privacy Protection' }
    ],
    techUsed: ['React 18', 'TypeScript', 'Vite', 'Shadcn UI', 'Radix UI', 'Tailwind CSS']
  },
  {
    id: 'prime-optical-vision',
    title: 'Prime Optical Vision — Eyewear ERP & Storefront',
    category: 'fintech-realtime',
    industryTag: 'Retail ERP & E-Commerce',
    outcome: 'Deployed an optical industry ERP and consumer storefront capturing granular lens power specifications with Supabase Realtime inventory synchronization.',
    thumbnail: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=800&q=80',
    accentColor: '#6366F1',
    badgeText: 'SUPABASE REALTIME · OPTICAL ERP',
    summary: 'Full-stack retail command center managing eyewear specifications (spherical power, cylindrical axis, pupil distance) with real-time stock deductions.',
    challenge: 'Generic e-commerce platforms cannot capture multi-dimensional prescription lens parameters, leading to high returns and customer dissatisfaction.',
    approach: 'Engineered a specialized eyewear configuration matrix backed by PostgreSQL with Row Level Security (RLS) and TanStack Query state hydration.',
    solution: 'Delivered an Admin Command Center for inventory and prescription verification, paired with a modern storefront featuring persistent cross-device shopping carts.',
    results: [
      { metric: 'Granular', label: 'Prescription Lens Specification Matrix' },
      { metric: 'Real-Time', label: 'Supabase Realtime Inventory Sync' },
      { metric: '100% RLS', label: 'Row Level Security Multi-Tenant Guard' }
    ],
    techUsed: ['React', 'TypeScript', 'Supabase', 'PostgreSQL RLS', 'TanStack Query', 'Shadcn UI']
  },
  {
    id: 'whatsapp-web-clone',
    title: 'WhatsApp Web Clone — Real-Time Messaging',
    category: 'fintech-realtime',
    industryTag: 'Real-Time Communication · MERN + WebSockets',
    outcome: 'Replicated core WhatsApp Web real-time communication with sub-50ms message delivery via Socket.IO, typing indicators, read receipts, and Docker containerization.',
    thumbnail: 'https://images.unsplash.com/photo-1611746872915-64382b5c76da?auto=format&fit=crop&w=800&q=80',
    accentColor: '#22C55E',
    badgeText: 'SOCKET.IO REAL-TIME CHAT',
    summary: 'Full-stack real-time messaging platform featuring persistent conversation history, active chat highlighting, auto-scroll, and media attachment prototypes.',
    challenge: 'Engineering seamless bidirectional messaging that remains resilient during brief mobile network disconnections without duplicating messages.',
    approach: 'Constructed an event-driven Socket.IO cluster paired with MongoDB change streams for guaranteed message delivery and read-state synchronization.',
    solution: 'Delivered a responsive two-panel communication UI complete with typing indicators, emoji pickers, online presence badges, and call-signaling interfaces.',
    results: [
      { metric: '<50ms', label: 'WebSocket Message Latency' },
      { metric: 'Real-Time', label: 'Typing Indicators & Read Receipts' },
      { metric: 'Dockerized', label: 'Production Microservice Architecture' }
    ],
    techUsed: ['React', 'Vite', 'Node.js', 'Express', 'Socket.IO', 'MongoDB', 'Docker', 'Tailwind CSS']
  },
  {
    id: 'chatecho-44',
    title: 'ChatEcho-44 — Low-Latency Messaging Engine',
    category: 'fintech-realtime',
    industryTag: 'Distributed Real-Time Messaging',
    outcome: 'Engineered a high-concurrency messaging application using Supabase Realtime and PostgreSQL Change Data Capture (CDC) with optimistic client UI rendering.',
    thumbnail: 'https://images.unsplash.com/photo-1577563908411-5077b6dc7624?auto=format&fit=crop&w=800&q=80',
    accentColor: '#06B6D4',
    badgeText: 'POSTGRESQL CDC REAL-TIME',
    summary: 'High-concurrency chat architecture pushing updates via REPLICA IDENTITY FULL through the Supabase Realtime Engine with strict RLS conversation isolation.',
    challenge: 'Traditional polling architectures create massive database load and latency spikes as concurrent user chat sessions grow into the thousands.',
    approach: 'Implemented PostgreSQL Change Data Capture (CDC) to stream database inserts and updates directly to subscribed client channels with optimistic UI rendering.',
    solution: 'Users experience immediate sub-10ms UI updates, accompanied by live presence heartbeats (online/offline) and human-readable timestamps.',
    results: [
      { metric: 'Optimistic UI', label: 'Instant Client-Side Message Display' },
      { metric: 'CDC Stream', label: 'PostgreSQL REPLICA IDENTITY FULL' },
      { metric: 'Zero Leakage', label: 'RLS-Enforced Chat Room Privacy' }
    ],
    techUsed: ['React 18', 'TypeScript', 'Vite', 'Supabase', 'PostgreSQL RLS', 'TanStack Query', 'Tailwind CSS']
  },

  // ==========================================
  // PART V · ENTERPRISE HR & PAYROLL
  // ==========================================
  {
    id: 'enterprise-employee-dashboard',
    title: 'Enterprise Employee Management Dashboard',
    category: 'enterprise-hr',
    industryTag: 'Human Resource Management',
    outcome: 'Delivered a full-stack MERN HR solution with debounced paginated employee registries and database-level MongoDB aggregation analytics.',
    thumbnail: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80',
    accentColor: '#8B5CF6',
    badgeText: 'MERN ENTERPRISE HR SYSTEM',
    summary: 'Workforce administration platform centralizing employee lifecycle CRUD, departmental status distribution, and credential verification.',
    challenge: 'Enterprise HR teams faced laggy UI dashboards when filtering thousands of employees across departments, tenure, and employment status.',
    approach: 'Offloaded heavy statistical computation from Node.js memory into optimized MongoDB aggregation pipelines, combined with client-side debounced search.',
    solution: 'Delivered real-time Recharts visualizations showing department headcount distributions, monthly hiring velocity, and secure credential updating.',
    results: [
      { metric: '100% Spec', label: 'Full Requirement Checklist Completion' },
      { metric: 'Sub-100ms', label: 'Debounced Multi-Dimension Querying' },
      { metric: 'Aggregations', label: 'Database-Native Analytics Pipelines' }
    ],
    techUsed: ['React 18', 'Tailwind CSS', 'Node.js', 'Express', 'MongoDB', 'Mongoose', 'JWT', 'Recharts']
  },
  {
    id: 'epems-payroll-system',
    title: 'Enterprise Payroll System (EPEMS) & HRMS',
    category: 'enterprise-hr',
    industryTag: 'Enterprise Payroll & Statutory Compliance',
    outcome: 'Automated statutory payroll calculations (PF/ESI/PT) with GPS and selfie-verified biometric attendance, secured by cryptographically chained audit logs.',
    thumbnail: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80',
    accentColor: '#059669',
    badgeText: 'STATUTORY PAYROLL · GPS & SELFIE PUNCH',
    summary: 'Full-stack enterprise HRMS automating salary revision histories, biometric punch-in APIs for remote field staff, and tamper-proof audit trails.',
    challenge: 'Remote and field staff attendance was vulnerable to proxy punch-ins, while manual calculation of statutory deductions (PF, ESI, Professional Tax) created regulatory risks.',
    approach: 'Engineered a GPS geo-fenced selfie capture module paired with an automated statutory payroll computation engine running on MySQL 8.',
    solution: 'HR directors gain one-click payroll generation, tamper-proof SHA-256 audit chaining, and Nginx reverse proxy protection with rate limiting on financial routes.',
    results: [
      { metric: 'Automated', label: 'PF, ESI & Professional Tax Deductions' },
      { metric: 'GPS + Selfie', label: 'Anti-Proxy Mobile Field Attendance' },
      { metric: 'Chained Logs', label: 'Cryptographic Audit Trail Tamper Defense' }
    ],
    techUsed: ['React 18', 'Node.js', 'Express', 'MySQL 8', 'JWT', 'Bcrypt', 'Docker', 'Nginx']
  },

  // ==========================================
  // PART VI · FRONTEND FOUNDATIONS & DATA
  // ==========================================
  {
    id: 'opticode-prime',
    title: 'OptiCode Prime — High-Performance React Starter',
    category: 'analytics-frontend',
    industryTag: 'Frontend Architecture & Tooling',
    outcome: 'Eliminated enterprise boilerplate fatigue with 40+ pre-optimized Shadcn components, strict TypeScript typing, and TanStack Query state hydration.',
    thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
    accentColor: '#3B82F6',
    badgeText: 'REACT ARCHITECTURE FOUNDATION',
    summary: 'Battle-tested enterprise React architecture starter designed for rapid scaffolding of type-safe, accessible, and high-performance applications.',
    challenge: 'Engineering teams spent 2-3 weeks at the start of every client project configuring build tools, UI libraries, theme providers, and state hydration.',
    approach: 'Pre-architected an opinionated Vite + TypeScript foundation with unified theme tokens, accessible Radix primitives, and reusable chart wrappers.',
    solution: 'Empowers developers to ship production-grade features on day one with out-of-the-box dark mode, notification toasts, and responsive navigation.',
    results: [
      { metric: '40+', label: 'Pre-Configured Accessible Components' },
      { metric: '100% Strict', label: 'TypeScript Type Safety' },
      { metric: 'Instant', label: 'Project Scaffolding Velocity' }
    ],
    techUsed: ['React 18', 'Vite', 'TypeScript', 'Tailwind CSS', 'TanStack Query', 'Shadcn UI', 'Recharts']
  },
  {
    id: 'nexusui-foundation',
    title: 'NexusUI — Modular Enterprise Frontend Core',
    category: 'analytics-frontend',
    industryTag: 'Component Design Systems',
    outcome: 'Pre-architected modular frontend design system allowing new business domains to drop into production without modifying existing foundational logic.',
    thumbnail: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80',
    accentColor: '#6366F1',
    badgeText: 'FEATURE-MODULAR FRONTEND CORE',
    summary: 'Enterprise UI scaffolding foundation built on React 18, Bun, and Vite, standardizing design tokens and responsive layout containers across teams.',
    challenge: 'Inconsistent design aesthetics and brittle component coupling when multiple developers contributed to the same enterprise portal.',
    approach: 'Enforced feature-modular directory structure isolating page-level business logic from shared design system primitives.',
    solution: 'Allowed cross-functional engineers to rapidly build and ship consistent, WCAG-accessible interfaces with zero styling regressions.',
    results: [
      { metric: 'Zero Friction', label: 'Feature-Modular Component Drop-In' },
      { metric: 'Bun + Vite', label: 'Sub-Second HMR Development Cycles' },
      { metric: 'WCAG 2.1', label: 'Accessible Design System Primitives' }
    ],
    techUsed: ['React 18', 'TypeScript', 'Vite', 'Bun', 'Shadcn UI', 'TanStack Query', 'Tailwind CSS']
  },
  {
    id: 'weather-intelligence-platform',
    title: 'Weather Intelligence Platform & Geocoding',
    category: 'analytics-frontend',
    industryTag: 'Serverless Intelligence & Geocoding',
    outcome: 'Deployed a serverless weather intelligence application via Cloudflare Pages Functions utilizing Open-Meteo APIs with zero API keys required.',
    thumbnail: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?auto=format&fit=crop&w=800&q=80',
    accentColor: '#0EA5E9',
    badgeText: 'SERVERLESS CLOUDFLARE FUNCTIONS',
    summary: 'Real-time weather planning recommendation engine providing rain, UV, and wind-based activity hints with resolved global geocoding aliases.',
    challenge: 'Third-party weather APIs impose strict rate limits and costly key requirements, while geocoding services often fail on city alias ambiguities (e.g. Bangalore vs Bengaluru).',
    approach: 'Leveraged free, open meteorological APIs through Cloudflare Pages Functions edge computing, paired with a custom client-side geocoding resolution cache.',
    solution: 'Provides live conditions, 7-day forecast trends, UV exposure radars, and automated planning tips with instantaneous serverless edge delivery.',
    results: [
      { metric: 'Zero Cost', label: 'Serverless Edge Architecture' },
      { metric: '7-Day', label: 'Predictive Atmospheric Trends' },
      { metric: 'Edge Speed', label: 'Cloudflare Pages Functions Routing' }
    ],
    techUsed: ['React 18', 'Vite 8', 'Tailwind 3', 'Express 5', 'Cloudflare Pages Functions', 'Open-Meteo API']
  },
  {
    id: 'tableau-advanced-visualizations',
    title: 'Tableau Advanced Business Intelligence Suite',
    category: 'analytics-frontend',
    industryTag: 'Enterprise BI & Big Data Analytics',
    outcome: 'Transformed multi-year enterprise sales datasets into interactive executive dashboards using Level of Detail (LOD) calculations and VizQL queries.',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    accentColor: '#F97316',
    badgeText: 'TABLEAU ENTERPRISE BI SUITE',
    summary: 'Strategic sales intelligence and BI suite analyzing profit-discount correlations, dynamic Top-N customer sets, and regional market penetration.',
    challenge: 'Executives struggled to extract actionable regional profitability trends from multi-gigabyte flat sales tables with traditional spreadsheets.',
    approach: 'Engineered a star-schema data model with Hyper in-memory extracts, formulating advanced Level of Detail (LOD) formulas and dynamic parameter switching.',
    solution: 'Constructed executive cockpits enabling instant toggling between Sales, Profit, and Quantity metrics with sub-second drill-down into underperforming territories.',
    results: [
      { metric: 'Sub-Second', label: 'Hyper In-Memory Query Speed' },
      { metric: 'LOD', label: 'Advanced Fixed & Include Calculations' },
      { metric: 'Dynamic', label: 'Top-N Parameter Switching Controls' }
    ],
    techUsed: ['Tableau Desktop', 'VizQL', 'Hyper Extracts', 'Excel/CSV', 'LOD Expressions', 'Star Schema']
  },
  {
    id: 'eventsphere-landing',
    title: 'EventSphere — High-Performance Event Platform',
    category: 'analytics-frontend',
    industryTag: 'Digital Events & E-Commerce Discovery',
    outcome: 'Engineered a premium dark-themed static landing platform centralizing community event discovery with deep external commerce integrations.',
    thumbnail: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80',
    accentColor: '#EAB308',
    badgeText: 'ULTRA-FAST STATIC ARCHITECTURE',
    summary: 'High-performance event showcase platform featuring glassmorphic aesthetics, fluid photo galleries, and direct external commerce deep-links.',
    challenge: 'High-traffic event announcement sites frequently suffer slow initial page loads, degrading mobile ticket conversion and sponsor engagement.',
    approach: 'Adopted an ultra-lean static HTML5/CSS3 architecture without framework bloat, optimizing font loading and critical-path asset delivery.',
    solution: 'Delivered an immersive dark aesthetic with gold accents, interactive schedule cards, and external sponsor shopping flows that load in under 100ms.',
    results: [
      { metric: '<100ms', label: 'Initial Page Load Speed' },
      { metric: 'Direct Links', label: 'Seamless External Commerce Conversion' },
      { metric: 'Glassmorphic', label: 'Modern Premium Event Styling' }
    ],
    techUsed: ['HTML5', 'CSS3 Modern', 'JavaScript', 'Google Fonts', 'Glassmorphism']
  }
];

export default portfolioProjects;
