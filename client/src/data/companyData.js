/**
 * vbrion Company Content & Section Metadata
 * Capabilities, Industries, Process, Testimonials, Team
 */

export const capabilitiesData = [
  {
    id: 'data-analytics',
    title: 'Data Analytics & Lakehouses',
    subtitle: 'Unified telemetry & high-throughput pipelines',
    description: 'Architecting high-throughput data pipelines, modern lakehouse infrastructures, and semantic data models that transform fragmented data silos into query-ready strategic assets.',
    icon: 'Database',
    accent: '#2563EB',
    badges: ['Snowflake', 'BigQuery', 'Databricks', 'Apache Spark', 'dbt', 'Kafka', 'PostgreSQL']
  },
  {
    id: 'ai-ml',
    title: 'AI / ML & Predictive Intelligence',
    subtitle: 'Mathematical precision & autonomous cognition',
    description: 'Developing custom neural architectures, computer vision pipelines, time-series forecasting engines, and generative AI copilot systems with rigorous governance and explainability.',
    icon: 'Brain',
    accent: '#7C3AED',
    badges: ['PyTorch', 'TensorFlow', 'Scikit-Learn', 'Hugging Face', 'LangChain', 'MLflow', 'FastAPI']
  },
  {
    id: 'dashboards-bi',
    title: 'Dashboards & BI Visualizations',
    subtitle: 'Boardroom-ready foresight cockpits',
    description: 'Translating multidimensional enterprise metrics into intuitive, executive command centers that enable leaders to make proactive, data-backed decisions with complete confidence.',
    icon: 'LayoutDashboard',
    accent: '#0284C7',
    badges: ['Power BI', 'Tableau', 'Apache Superset', 'D3.js', 'Looker', 'Metabase']
  },
  {
    id: 'digital-product-dev',
    title: 'Digital Product Development',
    subtitle: 'High-performance SaaS platforms & AI tools',
    description: 'Engineering scalable, secure, and intuitive digital products from rapid MVP validation to multi-tenant cloud ecosystems, robust REST/GraphQL APIs, and automated CI/CD pipelines.',
    icon: 'Code2',
    accent: '#4F46E5',
    badges: ['Full-Stack SaaS', 'React / Next.js', 'Node.js', 'TypeScript', 'Microservices', 'Tailwind CSS', 'GraphQL']
  },
  {
    id: 'cloud',
    title: 'Cloud & Infrastructure Modernization',
    subtitle: 'Elastic, zero-trust cloud architectures',
    description: 'Executing zero-downtime cloud migrations, Kubernetes container orchestration, resilient serverless architectures, and automated FinOps cloud cost optimization.',
    icon: 'Cloud',
    accent: '#0284C7',
    badges: ['AWS', 'Google Cloud', 'Microsoft Azure', 'Docker', 'Kubernetes', 'Terraform', 'CI/CD']
  },
  {
    id: 'automation',
    title: 'Intelligent Process Automation',
    subtitle: 'Self-healing workflows & robotic efficiency',
    description: 'Automating mission-critical workflows, statutory filings, AI document intelligence, and cross-platform transaction reconciliations with self-healing reliability.',
    icon: 'Cpu',
    accent: '#DB2777',
    badges: ['Airflow', 'Prefect', 'RPA Engines', 'Webhooks', 'Async Workers', 'OCR / Vision AI']
  }
];

export const industriesData = [
  {
    id: 'fintech',
    title: 'Fintech & Payments',
    tagline: 'Velocity, fraud mitigation & algorithmic trust',
    description: 'Empowering digital wallets, neo-banks, and lending platforms with sub-15ms anomaly detection, alternative credit scoring, and automated compliance clearing.',
    icon: 'TrendingUp',
    stats: 'Sub-15ms decisioning',
    solutions: ['Real-time fraud engines', 'Alternative credit scoring', 'Smart reconciliation']
  },
  {
    id: 'healthcare',
    title: 'Healthcare & Life Sciences',
    tagline: 'Predictive clinical pathways & operational care',
    description: 'Unifying fragmented patient telemetry into HIPAA-compliant clinical decision support tools that enhance patient care and optimize clinical resource allocation.',
    icon: 'Activity',
    stats: '34%+ readmission reduction',
    solutions: ['Early deterioration alerts', 'Clinical lakehouses', 'Resource scheduling']
  },
  {
    id: 'banking',
    title: 'Banking & Financial Institutions',
    tagline: 'Capital adequacy, AML & asset intelligence',
    description: 'Empowering tier-1 financial institutions to stress-test balance sheet risks, automate statutory filings, and combat financial crimes with vectorized simulation engines.',
    icon: 'Building2',
    stats: '99% simulation speedup',
    solutions: ['Basel III/IV capital engines', 'Automated AML triage', 'Customer LTV models']
  },
  {
    id: 'education',
    title: 'Higher Education & EdTech',
    tagline: 'Learner engagement telemetry & retention modeling',
    description: 'Equipping academic institutions with predictive learner journey telemetry, personalized retention alerts, and dynamic curriculum efficacy analytics.',
    icon: 'Compass',
    stats: '41%+ retention gain',
    solutions: ['Early-warning dropout radar', 'Learning telemetry', 'Faculty resource allocation']
  }
];

export const processSteps = [
  {
    step: '01',
    title: 'Discover & Align',
    duration: 'Weeks 1–2',
    description: 'Conducting deep discovery workshops with executive stakeholders to map friction points, audit existing data ecosystems, and establish measurable KPIs.',
    keyDeliverable: 'Architecture Blueprint & Strategic Horizon Document'
  },
  {
    step: '02',
    title: 'Design & Prototype',
    duration: 'Weeks 3–4',
    description: 'Synthesizing robust architecture models, designing responsive user interfaces, and validating mathematical models against sanitized production datasets.',
    keyDeliverable: 'Interactive Proof of Concept (PoC) & Benchmark Report'
  },
  {
    step: '03',
    title: 'Build & Integrate',
    duration: 'Weeks 5–8',
    description: 'Engineering production-grade microservices, deploying resilient automated pipelines, and integrating seamlessly into existing enterprise workflows.',
    keyDeliverable: 'Hardened Production Release & Automated CI/CD'
  },
  {
    step: '04',
    title: 'Scale & Continuous Governance',
    duration: 'Ongoing',
    description: 'Delivering continuous model drift telemetry, elastic cloud scaling, proactive governance updates, and SLA-backed engineering support.',
    keyDeliverable: 'Observability Cockpit & 24/7 SLA Assurance'
  }
];

export const clientLogos = [
  { id: 1, name: 'Apex FinTech Global', sector: 'Financial Engineering' },
  { id: 2, name: 'NovaHealth Healthcare', sector: 'Clinical Analytics' },
  { id: 3, name: 'Sterling Horizon Bank', sector: 'Commercial Banking' },
  { id: 4, name: 'Vanguard Academic Group', sector: 'EdTech & Research' },
  { id: 5, name: 'OmniTrade International', sector: 'Enterprise Supply Chain' },
  { id: 6, name: 'Quantica Capital Labs', sector: 'Algorithmic Trading' },
  { id: 7, name: 'Acuity BioSystems', sector: 'Life Sciences' },
  { id: 8, name: 'Stratum Enterprise Cloud', sector: 'Technology Consulting' },
];

export const testimonialsData = [
  {
    id: 1,
    quote: "vbrion demonstrated extraordinary foresight in resolving our high-throughput transaction risk bottlenecks. Their analytics team architected a streaming neural fraud mesh that reduced false positives by 62% and paid for itself within the very first quarter of rollout.",
    author: "Elena Rostova",
    title: "Chief Risk & Analytics Officer",
    company: "Apex FinTech Global",
    sector: "Fintech & Payments",
    rating: 5,
  },
  {
    id: 2,
    quote: "Combining legal statutory compliance with modern AI engineering is an exceptionally rare capability. vbrion delivered our multi-jurisdiction regulatory cockpit ahead of schedule, ensuring total audit readiness without disrupting our live operations.",
    author: "Rajiv Mehra",
    title: "VP of Legal & Enterprise Governance",
    company: "OmniTrade International",
    sector: "Legal & Governance",
    rating: 5,
  },
  {
    id: 3,
    quote: "The predictive patient trajectory lakehouse engineered by vbrion transformed our ICU and emergency triage protocols. We witnessed a 34% drop in preventable 30-day readmissions. Their technical depth and domain empathy are unmatched.",
    author: "Dr. Sarah Jenkins, MD",
    title: "Chief Medical Information Officer",
    company: "NovaHealth Systems",
    sector: "Healthcare Analytics",
    rating: 5,
  },
  {
    id: 4,
    quote: "For our Basel III/IV stress testing, vbrion engineered an automated vector simulation pipeline that cut overnight computational runtimes from 6 hours to under 8 minutes. Regulators commended our transparency and model audit trail.",
    author: "Marcus Vance",
    title: "Head of Treasury Quantitative Risk",
    company: "Sterling Horizon Bank",
    sector: "Banking Solutions",
    rating: 5,
  },
  {
    id: 5,
    quote: "vbrion's placement consulting practice helped us secure elite quantitative researchers and lead machine learning engineers within weeks. Every single hire exceeded our rigorous benchmark standards.",
    author: "Ananya Deshmukh",
    title: "Chief People & Talent Officer",
    company: "Quantica Capital Labs",
    sector: "Career & Placement",
    rating: 5,
  },
  {
    id: 6,
    quote: "Their business solutions consulting team restructured our enterprise revenue ops and dynamic pricing models. We experienced an 18% margin expansion across our primary B2B product lines within six months.",
    author: "David Chen",
    title: "Senior Vice President of Operations",
    company: "Stratum Enterprise Cloud",
    sector: "Business Solutions",
    rating: 5,
  }
];

export const teamMembers = [
  {
    id: 1,
    name: 'Amjath Basha',
    role: 'Director',
    specialization: 'Strategic Direction & Enterprise Growth',
    bio: 'Guiding vbrion\'s strategic vision, corporate governance, and executive partnerships across cutting-edge IT consulting and digital transformation.',
    avatar: '/team/amjath-basha.jpg',
  },
  {
    id: 2,
    name: 'Vaishnavi C',
    role: 'Business Head',
    specialization: 'Enterprise Solutions & Client Alliances',
    bio: 'Driving strategic business growth, key institutional accounts, corporate partnerships, and consultative client engagements.',
    avatar: '/team/vaishnavi-c.jpg',
  },
  {
    id: 3,
    name: 'Nesarajan PN',
    role: 'Software Development Lead',
    specialization: 'Systems Architecture & Technical Leadership',
    bio: 'Overseeing technology architecture, engineering delivery, agile sprints, and software excellence across mission-critical enterprise systems.',
    avatar: '/team/nesarajan-pn.png',
  },
  {
    id: 4,
    name: 'Prawin Kumar N',
    role: 'Software Development Engineer',
    specialization: 'Full-Stack Platforms & Distributed Systems',
    bio: 'Engineering resilient full-stack systems, clean code architecture, database optimization, and high-performance applications.',
    avatar: '/team/prawin-kumar-n.jpg',
  },
  {
    id: 5,
    name: 'Manoj Hariharan',
    role: 'Frontend Developer',
    specialization: 'Modern UI/UX & Responsive Web Applications',
    bio: 'Engineering interactive, responsive, and pixel-perfect web interfaces with modern user experience principles, animations, and design systems.',
    avatar: '/team/manoj-hariharan.jpg',
  },
  {
    id: 6,
    name: 'Kungumanitsh K',
    role: 'Backend Developer',
    specialization: 'High-Concurrency Backends & Cloud Microservices',
    bio: 'Architecting high-concurrency microservices, robust database systems, secure APIs, distributed cloud backends, and transaction-safe pipelines.',
    avatar: '/team/kungumanithish-k.jpg',
  },
  {
    id: 7,
    name: 'Manoj Anbalagan',
    role: 'AI Engineer',
    specialization: 'Deep Learning & Predictive AI',
    bio: 'Developing predictive intelligence models, advanced neural workflows, computer vision, and generative AI enterprise integrations.',
    avatar: '/team/manoj-anbalagan.jpg',
  }
];

export const ourPillars = teamMembers;

