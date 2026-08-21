export interface ServiceItem {
  id: string;
  title: string;
  category: string;
  shortDesc: string;
  fullDesc: string;
  iconName: string;
  features: string[];
  deliverables: string[];
  metrics: string;
  gradient: string;
  description?: string;
  icon?: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  client: string;
  year: string;
  summary: string;
  challenge: string;
  solution: string;
  fullStory: string;
  results: { label: string; value: string }[];
  tags: string[];
  featured: boolean;
  image: string;
  liveUrl?: string;
  githubUrl?: string;
}

export interface ArticleItem {
  id: string; // UUID from Supabase
  title: string;
  slug?: string;
  category: string;
  readTime?: string;
  date?: string; // fallback
  published_date?: string; // from db
  author?: {
    name: string;
    role: string;
    avatar: string;
  };
  excerpt: string;
  coverImage?: string; // fallback
  cover_image_url?: string; // from db
  tags?: string[];
  content: string;
  created_at?: string;
}

export interface TestimonialItem {
  id: string;
  name?: string; // fallback
  full_name?: string; // from db
  role?: string; // fallback
  role_company?: string; // from db
  company?: string; 
  content?: string; // fallback
  review_text?: string; // from db
  rating: number;
  projectType?: string;
  avatar?: string;
  verified?: boolean;
  is_approved?: boolean;
  created_at?: string;
}

export interface FaqItem {
  category: string;
  question: string;
  answer: string;
}

export interface TechItem {
  name: string;
  category: string;
  icon: string;
  color: string;
}

export interface TechStackItem {
  category: string;
  technologies: TechItem[];
}

export interface ContactSubmission {
  id: string;
  full_name: string;
  email: string;
  project_type: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

export interface EstimatorInquiry {
  id: string;
  email: string;
  project_scope: any;
  budget_range: string;
  created_at: string;
}
