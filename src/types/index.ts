export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  iconName: string;
  category: string;
  features: string[];
  deliverables: string[];
  metrics: string;
  gradient: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: 'Web Apps' | 'UI/UX' | 'E-commerce' | 'AI / Cloud';
  client: string;
  summary: string;
  fullStory: string;
  challenge: string;
  solution: string;
  results: { label: string; value: string }[];
  tags: string[];
  image: string;
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  year: string;
}

export interface ArticleItem {
  id: string;
  title: string;
  slug: string;
  category: 'Engineering' | 'UI/UX' | 'Architecture' | 'Performance';
  readTime: string;
  date: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  excerpt: string;
  content: string;
  coverImage: string;
  tags: string[];
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  rating: number;
  content: string;
  verified: boolean;
  projectType: string;
}

export interface FaqItem {
  question: string;
  answer: string;
  category: string;
}

export interface TechItem {
  name: string;
  category: string;
  icon: string;
  color: string;
}
