import { PortfolioItem } from '../types';

export const portfolioData: PortfolioItem[] = [
  {
    id: 'aura-cloud',
    title: 'Aura Cloud — AI Infrastructure Platform',
    category: 'AI / Cloud',
    client: 'Aura Systems Inc. (San Francisco, CA)',
    summary: 'Next-generation cloud control plane and developer platform featuring real-time node telemetry, automated model deployments, and sub-10ms edge routing.',
    fullStory: 'Aura required a flagship web platform capable of handling millions of daily developer interactions, complex multi-region GPU provisioning workflows, and real-time streaming terminal logs.',
    challenge: 'Managing high-frequency WebSocket streams without degrading client-side 60FPS UI performance or triggering unnecessary React re-renders.',
    solution: 'Built with Next.js 14 App Router, Web Workers for background data processing, custom Canvas-based real-time time-series telemetry charts, and Tailwind CSS design tokens.',
    results: [
      { label: 'Time to First Byte', value: '28ms' },
      { label: 'Lighthouse Score', value: '100/100' },
      { label: 'Active Developers', value: '450k+' },
      { label: 'Cloud Cost Savings', value: '38%' }
    ],
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'WebSockets', 'WebWorkers', 'PostgreSQL'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    liveUrl: 'https://auracloud.example.com',
    githubUrl: 'https://github.com/syntaxvirtual/aura-cloud',
    featured: true,
    year: '2026'
  },
  {
    id: 'veloce-capital',
    title: 'Veloce Capital — Institutional Fintech Dashboard',
    category: 'Web Apps',
    client: 'Veloce Asset Management (London, UK)',
    summary: 'Institutional multi-asset trading platform with ultra-low latency real-time order books, portfolio risk analytics, and algorithmic execution controls.',
    fullStory: 'Veloce needed a bespoke web application to replace legacy desktop trading terminals with a zero-install, hyper-secure web portal for wealth managers.',
    challenge: 'Rendering 500+ ticker updates per second across 12 simultaneous chart widgets without browser jank.',
    solution: 'Engineered a virtualized canvas rendering engine connected to a FastAPI backend over binary WebSocket frames, secured with biometrics and JWT hardware tokens.',
    results: [
      { label: 'Order Execution UI Lag', value: '< 2ms' },
      { label: 'Assets Tracked', value: '$1.4B' },
      { label: 'Daily Trading Volume', value: '$85M' },
      { label: 'Trader CSAT Score', value: '99.4%' }
    ],
    tags: ['React', 'FastAPI', 'TypeScript', 'Canvas API', 'Tailwind CSS', 'Redis'],
    image: 'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&w=1200&q=80',
    liveUrl: 'https://velocecapital.example.com',
    featured: true,
    year: '2026'
  },
  {
    id: 'lumina-luxe',
    title: 'Lumina Luxe — Headless Luxury E-commerce',
    category: 'E-commerce',
    client: 'Lumina Horology Group (Geneva, Switzerland)',
    summary: 'Bespoke headless e-commerce experience with interactive 3D product customization, one-click Apple Pay checkout, and zero page transition delay.',
    fullStory: 'A world-renowned Swiss luxury timepiece atelier sought to modernize its online boutique with digital craftsmanship that matched the horological perfection of their watches.',
    challenge: 'Merging high-fidelity 3D WebGL configurator rendering with instant page transitions and sub-1s checkout flows.',
    solution: 'Designed an Astro + Next.js headless frontend backed by Shopify Storefront API and Three.js 3D shaders, achieving instant sub-resource caching.',
    results: [
      { label: 'Checkout Conversion Lift', value: '+74%' },
      { label: 'Mobile Bounce Rate', value: '-42%' },
      { label: 'Average Order Value', value: '$4,200' },
      { label: 'Global Page Load', value: '0.4s' }
    ],
    tags: ['Next.js', 'Shopify Headless', 'Three.js', 'Stripe', 'Tailwind CSS'],
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80',
    liveUrl: 'https://luminaluxe.example.com',
    featured: true,
    year: '2025'
  },
  {
    id: 'pulse-health',
    title: 'PulseHealth OS — Clinical Telemedicine Suite',
    category: 'Web Apps',
    client: 'Pulse Health Technologies (New York, NY)',
    summary: 'HIPAA-compliant telemedicine web portal enabling encrypted HD video consultations, automated EHR transcription, and multi-clinician scheduling.',
    fullStory: 'Healthcare providers required an intuitive, zero-barrier consultation platform that worked seamlessly across low-bandwidth mobile connections.',
    challenge: 'Strict HIPAA encryption compliance, WebRTC multi-peer stability, and instant automated clinical note generation.',
    solution: 'Constructed an end-to-end encrypted WebRTC mesh integrated with automated audio transcription pipelines and strict RBAC authorization.',
    results: [
      { label: 'Patient Consultations', value: '320k+' },
      { label: 'Clinician Time Saved', value: '3.5 hrs/day' },
      { label: 'Security Audit', value: '100% Pass' },
      { label: 'Video Call Uptime', value: '99.99%' }
    ],
    tags: ['React', 'WebRTC', 'Node.js', 'Tailwind CSS', 'PostgreSQL', 'Docker'],
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
    liveUrl: 'https://pulsehealth.example.com',
    featured: false,
    year: '2025'
  },
  {
    id: 'kroma-studio',
    title: 'Kroma Motion — Spatial Interactive Portfolio',
    category: 'UI/UX',
    client: 'Kroma Creative Studio (Berlin, Germany)',
    summary: 'Award-winning interactive brand experience featuring custom GLSL shaders, magnetic cursor micro-interactions, and fluid physics layout animations.',
    fullStory: 'An avant-garde European design studio wanted an experimental yet ultra-accessible digital identity that pushed the boundaries of modern browser graphics.',
    challenge: 'Delivering buttery smooth 60-120fps fluid shader physics on both high-end desktop GPUs and low-power mobile devices.',
    solution: 'Crafted adaptive WebGL shaders that scale dynamically with device performance tiers and device pixel ratio (DPR).',
    results: [
      { label: 'Awwwards Recognition', value: 'Site of the Day' },
      { label: 'Average Session Time', value: '4m 12s' },
      { label: 'Inbound Inquiries', value: '+310%' },
      { label: 'Mobile Frame Rate', value: '60 FPS' }
    ],
    tags: ['WebGL / GLSL', 'React', 'Tailwind CSS', 'Figma', 'TypeScript'],
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80',
    liveUrl: 'https://kromastudio.example.com',
    featured: false,
    year: '2025'
  },
  {
    id: 'synthetix-ai',
    title: 'Synthetix AI — LLM Prompt & Workflow Engine',
    category: 'AI / Cloud',
    client: 'Synthetix Cognitive Labs (Austin, TX)',
    summary: 'Visual node-based agent orchestration canvas, multi-model token cost simulator, and real-time synthetic dataset evaluation platform.',
    fullStory: 'AI engineering teams needed an IDE-grade visual workspace to connect autonomous LLM agents, test prompt variations, and benchmark latency.',
    challenge: 'Infinite zoom-pan interactive node graph canvas with hundreds of active agent state connections and live token streaming.',
    solution: 'Engineered an interactive canvas with high-performance WebGL node connectors and sub-millisecond graph topological evaluation.',
    results: [
      { label: 'Active Workflows Built', value: '1.8M+' },
      { label: 'Token Cost Reduction', value: '45%' },
      { label: 'Enterprise Adoptions', value: '80+' },
      { label: 'Latency Benchmark', value: '< 15ms' }
    ],
    tags: ['Next.js', 'Python', 'FastAPI', 'Tailwind CSS', 'TypeScript', 'Supabase'],
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    liveUrl: 'https://synthetix.example.com',
    featured: true,
    year: '2026'
  }
];
