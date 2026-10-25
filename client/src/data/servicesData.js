/**
 * vbrion 11 Core Services across 2 Strategic Divisions
 */

export const servicesData = {
  divisions: [
    {
      id: 'consulting',
      name: 'Consulting Services',
      tagline: 'Strategic oversight, regulatory certainty, and enterprise transformation.',
      description: 'Guiding executive leadership through regulatory headwinds, risk frameworks, and human capital optimization with foresight and precision.',
      badge: 'Strategic Advisory',
      services: [
        {
          id: 'risk-governance',
          title: 'Risk & Governance',
          shortDesc: 'Enterprise-wide risk quantification, internal controls, and board-level governance architecture.',
          icon: 'ShieldCheck',
          offerings: [
            'Enterprise Risk Management (ERM) Frameworks',
            'Internal Controls & Audit Readiness',
            'Board Advisory & Governance Metric Dashboards'
          ]
        },
        {
          id: 'legal-compliances',
          title: 'Legal Compliances',
          shortDesc: 'Automated statutory tracking, cross-border regulatory audits, and proactive compliance shields.',
          icon: 'Scale',
          offerings: [
            'Statutory & Regulatory Mapping Systems',
            'Cross-Jurisdictional Compliance Audits',
            'Automated Policy Enforcement & Tracking'
          ]
        },
        {
          id: 'business-solutions',
          title: 'Business Solutions',
          shortDesc: 'Operational efficiency engineering, lean process transformation, and sustainable scaling blueprints.',
          icon: 'TrendingUp',
          offerings: [
            'End-to-End Operational Bottleneck Diagnostics',
            'Supply Chain & Resource Optimization',
            'Revenue Operations Architecture'
          ]
        },
        {
          id: 'career-consulting',
          title: 'Career Consulting',
          shortDesc: 'Executive career progression strategies, skills radar assessments, and leadership navigation.',
          icon: 'Compass',
          offerings: [
            'C-Suite & Senior Leadership Career Roadmaps',
            'Domain Competency Gap Analysis',
            'Strategic Executive Personal Branding'
          ]
        },
        {
          id: 'placement-consulting',
          title: 'Placement Consulting',
          shortDesc: 'Specialized executive search, high-impact talent pipeline matching, and technical team building.',
          icon: 'Users',
          offerings: [
            'Precision Executive & Quant Talent Search',
            'Bespoke Candidate Competency Assessments',
            'Enterprise Talent Pipeline Architecture'
          ]
        },
        {
          id: 'technology-consulting',
          title: 'Technology & Product Engineering',
          shortDesc: 'Enterprise digital product development, cloud architecture modernization, and full-stack SaaS engineering.',
          icon: 'Cpu',
          offerings: [
            'Digital Product Development & Enterprise SaaS Architecture',
            'Cloud-Native Microservices & Distributed APIs',
            'Autonomous AI Agent & Copilot Integrations',
            'Infrastructure Modernization & Automated CI/CD DevOps'
          ]
        }
      ]
    },
    {
      id: 'analytical',
      name: 'Analytical Solutions',
      tagline: 'Deep analytics, algorithmic intelligence, and high-throughput data engineering.',
      description: 'Transforming dense transactional, clinical, and customer data into real-time foresight and automated decision intelligence.',
      badge: 'Data & AI Engineering',
      services: [
        {
          id: 'fintech',
          title: 'Fintech Solutions',
          shortDesc: 'Algorithmic fraud detection, predictive credit models, and real-time transaction intelligence.',
          icon: 'LineChart',
          offerings: [
            'Real-Time Fraud & Anomaly Detection Engines',
            'Alternative Data Credit Scoring Models',
            'Automated Payment Ledger Reconciliation'
          ]
        },
        {
          id: 'healthcare',
          title: 'Healthcare Analytics',
          shortDesc: 'Clinical predictive modeling, patient pathway optimization, and medical operations intelligence.',
          icon: 'Activity',
          offerings: [
            'Patient Readmission & Triage Predictive Models',
            'HIPAA/GDPR Compliant Health Lakehouse Design',
            'Clinical Resource & Bed Occupancy Optimization'
          ]
        },
        {
          id: 'banking-solutions',
          title: 'Banking Solutions',
          shortDesc: 'Core banking risk analytics, liquidity stress testing, and customer lifetime value engines.',
          icon: 'Building2',
          offerings: [
            'Basel III/IV & Liquidity Stress Testing Tools',
            'Customer Attrition & Deep LTV Propensity Models',
            'Automated Anti-Money Laundering (AML) Triaging'
          ]
        },
        {
          id: 'education',
          title: 'Education Analytics',
          shortDesc: 'Adaptive learning telemetry, retention analytics, and institutional outcome benchmarking.',
          icon: 'GraduationCap',
          offerings: [
            'Student Drop-Out Early Warning Systems',
            'Curriculum Efficacy & Engagement Telemetry',
            'Institutional Resource Allocation Forecasts'
          ]
        },
        {
          id: 'business-development',
          title: 'Business Development Analytics',
          shortDesc: 'Market foresight models, B2B intent engines, and pipeline velocity predictive analytics.',
          icon: 'BarChart3',
          offerings: [
            'B2B Account Intent & Propensity Scoring',
            'Dynamic Pricing & Elasticity Simulators',
            'Territory Potential & Quota Optimization'
          ]
        }
      ]
    }
  ]
};

// Flat array of all 11 services for dropdowns and quick lookups
export const allServicesList = [
  ...servicesData.divisions[0].services.map(s => ({ ...s, division: 'Consulting Services' })),
  ...servicesData.divisions[1].services.map(s => ({ ...s, division: 'Analytical Solutions' }))
];
