import { ServiceItem } from '../types';

export const servicesData: ServiceItem[] = [
  {
    id: 'web-development',
    title: 'Web Development',
    category: 'Engineering',
    shortDesc: 'Ultra-fast, scalable, and responsive web platforms built with modern frameworks like Next.js, React, and Astro.',
    fullDesc: 'We craft high-performance, accessible, and beautifully responsive web applications designed to load in milliseconds. From dynamic portals to modern marketing engines, our code is modular, type-safe, and engineered for maximum conversion.',
    iconName: 'Code2',
    features: [
      'Next.js 14+ App Router & Server Components',
      'Astro for sub-second content sites',
      'Pixel-perfect responsive implementation',
      'Automated CI/CD & zero-downtime deployment',
      'Strict TypeScript & unit/E2E test coverage'
    ],
    deliverables: [
      'Production-ready codebase repository',
      'Automated testing suites',
      'Lighthouse 95+ score guarantee',
      'Comprehensive deployment documentation'
    ],
    metrics: '99.8% Average Lighthouse Score',
    gradient: 'from-purple-500/20 via-blue-500/10 to-transparent'
  },
  {
    id: 'ui-ux-design',
    title: 'UI/UX Design & Design Systems',
    category: 'Design',
    shortDesc: 'Bespoke, human-centric visual design systems, interactive prototypes, and luxury digital experiences that captivate users.',
    fullDesc: 'We bridge aesthetics and engineering. We design comprehensive design systems, high-fidelity interactive prototypes in Figma, and frictionless UX journeys tailored to elevate brand prestige and drive user retention.',
    iconName: 'Palette',
    features: [
      'Atomic Design Systems & Component Tokens',
      'High-fidelity micro-interactions & motion specs',
      'Dark/Light mode multi-theme architectures',
      'Usability research & behavioral UX heatmaps',
      'Direct developer handoff tokens & guidelines'
    ],
    deliverables: [
      'Full Figma workspace with component library',
      'Interactive clickable prototypes',
      'Design tokens (Tailwind / CSS Variables)',
      'UX research & audit documentation'
    ],
    metrics: '+45% Increase in User Engagement',
    gradient: 'from-violet-500/20 via-fuchsia-500/10 to-transparent'
  },
  {
    id: 'seo-performance',
    title: 'SEO & Performance Optimization',
    category: 'Optimization',
    shortDesc: 'Sub-100ms TTFB, flawless Core Web Vitals, rich structured metadata, and data-driven organic ranking dominance.',
    fullDesc: 'Speed is revenue. We audit, refactor, and hyper-optimize web platforms to achieve 100/100 Core Web Vitals. Combined with semantic HTML, JSON-LD structured schema, and dynamic OpenGraph assets, we ensure search engines prioritize your platform.',
    iconName: 'Zap',
    features: [
      'Core Web Vitals (LCP, INP, CLS) optimization',
      'Edge caching, CDN routing & SSR strategies',
      'JSON-LD semantic rich schema markup',
      'Dynamic OpenGraph and Twitter card rendering',
      'Automated sitemaps & crawl budget optimization'
    ],
    deliverables: [
      'Before & after performance benchmark audit',
      'Edge CDN caching configuration',
      'Complete SEO metadata architecture',
      'Search Console & Analytics tracking setup'
    ],
    metrics: '< 50ms Edge Response Time',
    gradient: 'from-blue-500/20 via-cyan-500/10 to-transparent'
  },
  {
    id: 'custom-web-apps',
    title: 'Custom Web Applications & SaaS',
    category: 'Full-Stack',
    shortDesc: 'Bespoke cloud-native platforms, real-time analytics dashboards, and enterprise-grade SaaS products built for scale.',
    fullDesc: 'We architect enterprise-grade software from the database layer to the user interface. Real-time WebSockets, robust REST/GraphQL APIs, distributed databases, role-based access control, and seamless third-party cloud integrations.',
    iconName: 'Cpu',
    features: [
      'FastAPI, Node.js & Go backend microservices',
      'PostgreSQL, Supabase & Redis caching',
      'Real-time WebSocket & event-driven architecture',
      'Role-based access control (RBAC) & OAuth2',
      'Multi-tenant database schema architecture'
    ],
    deliverables: [
      'Scalable microservice / monolithic backend',
      'Interactive real-time web dashboard',
      'Swagger / OpenAPI interactive specs',
      'Docker containerized deployment configs'
    ],
    metrics: '99.99% Uptime SLA Ready',
    gradient: 'from-indigo-500/20 via-purple-500/10 to-transparent'
  },
  {
    id: 'ecommerce-solutions',
    title: 'E-commerce Solutions',
    category: 'E-commerce',
    shortDesc: 'Headless commerce storefronts, custom checkout flows, and high-converting payment integrations engineered for revenue.',
    fullDesc: 'Unlock unprecedented speed and flexibility with headless Shopify, MedusaJS, and custom Stripe/PayPal checkouts. We eliminate cart friction, optimize mobile conversions, and deliver a smooth luxury shopping experience.',
    iconName: 'ShoppingBag',
    features: [
      'Headless Shopify & Next.js Commerce architecture',
      'Stripe Elements & Custom Checkout flow',
      'Instant search & faceted product filtering',
      'Automated inventory & ERP webhook sync',
      'Global multi-currency & localized pricing'
    ],
    deliverables: [
      'Headless e-commerce storefront',
      'Custom cart & payment gateway integration',
      'Product catalog migration & setup',
      'Conversion tracking & pixel setup'
    ],
    metrics: '+62% Checkout Conversion Lift',
    gradient: 'from-emerald-500/20 via-blue-500/10 to-transparent'
  },
  {
    id: 'brand-identity',
    title: 'Brand Identity & Digital Strategy',
    category: 'Branding',
    shortDesc: 'Distinctive digital branding, vector iconography, motion assets, and positioning strategies that stand out in crowded markets.',
    fullDesc: 'A brand is an emotional promise. We define your digital identity with bespoke logos, typography hierarchies, custom 3D/vector illustrations, pitch collateral, and digital style guides that establish market authority.',
    iconName: 'Sparkles',
    features: [
      'Vector Logo Suite & Responsive Favicons',
      'Color science & typography hierarchy guidelines',
      'Digital brand guidelines & usage manual',
      'Social media kit & marketing collateral assets',
      'Executive pitch deck templates'
    ],
    deliverables: [
      'Master Brand Identity Kit (SVG/EPS/PNG)',
      'Digital Brand Guidelines PDF',
      'Social & presentation templates',
      'Custom vector illustration set'
    ],
    metrics: '100% Bespoke Identity Design',
    gradient: 'from-amber-500/20 via-purple-500/10 to-transparent'
  },
  {
    id: 'maintenance-support',
    title: 'Maintenance & 24/7 Support',
    category: 'Operations',
    shortDesc: 'Continuous uptime monitoring, security patching, cloud optimization, and ongoing feature sprints.',
    fullDesc: 'Protect your digital investment. We provide round-the-clock infrastructure monitoring, weekly dependency updates, database backups, automated vulnerability scans, and dedicated engineering hours for new feature sprints.',
    iconName: 'ShieldCheck',
    features: [
      '24/7 Automated uptime & error monitoring',
      'Weekly security patching & dependency audits',
      'Automated encrypted daily cloud backups',
      'Dedicated engineering sprint hours',
      'Priority SLA response times (< 1 hour)'
    ],
    deliverables: [
      'Monthly performance & health reports',
      'Real-time incident response alerts',
      'Dedicated Slack/Telegram channel',
      'Continuous feature backlog execution'
    ],
    metrics: '< 15min Emergency Response SLA',
    gradient: 'from-sky-500/20 via-indigo-500/10 to-transparent'
  }
];
