
export enum AppView {
  DASHBOARD = 'DASHBOARD',
  POST_GEN = 'POST_GEN',
  CONTENT_PLAN = 'CONTENT_PLAN',
  PRODUCT_BUILDER = 'PRODUCT_BUILDER',
  PROFILE = 'PROFILE',
  QUIZ = 'QUIZ',
  INSPIRATION = 'INSPIRATION',
  PRICING = 'PRICING',
  SALES_LAB = 'SALES_LAB',
  SUPPORT = 'SUPPORT',
  CLIENT_SIMULATOR = 'CLIENT_SIMULATOR'
}

export interface UserProfile {
  name: string;
  niche: string;
  specialization: string;
  voiceStyle: string;
  telegramChatId: string;
  videoIntroUrl?: string;
  diplomas?: string[];
  isPremium: boolean;
  generationsUsed: number;
  telegramUser?: {
    id: number;
    username?: string;
    first_name: string;
  };
}

export interface ContentPlanItem {
  day: number;
  type: string;
  topic: string;
  description: string;
}

export interface ProductStep {
  id: number;
  title: string;
  status: 'pending' | 'in-progress' | 'completed';
  data: any;
}
