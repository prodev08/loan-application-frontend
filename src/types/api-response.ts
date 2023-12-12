/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IApiResponse {
  result: "error" | "success";
  error?: string;
  data?: any;
}
