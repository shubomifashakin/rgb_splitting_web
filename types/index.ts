export type apiKeyInfo = {
  projectId: string;
  projectName: string;
  currentPlan: string;
  sub_status: PROJECT_STATUS;
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
