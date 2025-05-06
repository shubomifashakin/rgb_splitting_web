export type Projects = {
  projects: {
    projectId: string;
    projectName: string;
    currentPlan: string;
    sub_status: PROJECT_STATUS;
  }[];
  nextKey?: object;
};

export enum PROJECT_STATUS {
  Inactive = "inactive",
  ActivePro = "active-pro",
  ActiveFree = "active-free",
  ActiveExecutive = "active-executive",
}

export enum PLAN {
  Free = "free",
  Pro = "pro",
  Executive = "executive",
}

export type ProjectInfo = {
  projectInfo: {
    projectName: string;
    sub_status: PROJECT_STATUS;

    imageId: string;
    createdAt: number;
    originalImageUrl: string;

    currentPlan: PLAN;
    nextPaymentDate: number;
    currentBillingDate: number;

    apiKey: string;
  }[];
  nextKey?: object;
};

export type ProcessedImages = {
  createdAt: number;
  imageId: string;
  projectId: string;
  originalImageUrl: string;
  results: { channels: string; grain: number; url: string }[];
};

export interface PaymentPlan {
  id: number;
  name: string;
  amount: number;
  status: string;
  interval: string;
  currency: string;
  duration: number;
  plan_token: string;
  created_at: string;
}

interface PageInfo {
  total: number;
  total_pages: number;
  current_page: number;
}

interface Meta {
  page_info: PageInfo;
}

export interface PaymentPlansResponse {
  meta: Meta;
  status: string;
  message: string;
  data: PaymentPlan[];
}
