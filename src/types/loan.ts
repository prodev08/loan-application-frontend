export interface IBalanceRequest {
  businessId: string;
  loanAmount: number;
  accountName: string;
}

export interface IBalanceSheet {
  year: number;
  month: number;
  profitOrLoss: number;
  assetsValue: number;
}

export interface IBalanceResponse {
  sheet: IBalanceSheet[];
  loanId: string;
}

export interface ISubmitRequest {
  loanId: string;
}
