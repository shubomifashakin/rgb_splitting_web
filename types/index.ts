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
