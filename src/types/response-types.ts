export type APIResponse<T = undefined> = {
  success: boolean;
  status: number;
  data?: T;
  error?: string;
  message?: string;
};
