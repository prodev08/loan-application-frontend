import toast from "react-hot-toast";
import { post, put } from "@/utils/api";
import { appConfig } from "@/config";
import {
  loanRequestPending,
  loanRequestSuccess,
  loanRequestFail,
  submitRequestPending,
  submitRequestSuccess,
  submitRequestFail,
} from "./slice";
import { AppDispatch } from "@/store";
import { IBalanceRequest, IBalanceResponse, ISubmitRequest } from "@/types";

export const fetchBalanceService =
  (data: IBalanceRequest) => async (dispatch: AppDispatch) => {
    dispatch(loanRequestPending());

    const onSuccess = (data: IBalanceResponse): void => {
      dispatch(loanRequestSuccess(data));
    };

    const onError = (error: string | undefined): void => {
      dispatch(loanRequestFail(error));
      toast.error(<>{error}</>);
    };

    return post<IBalanceResponse>(
      `${appConfig.apiUrl}balances`,
      appConfig.apiTimeoutSeconds,
      data,
      undefined,
      onSuccess,
      onError,
      onError
    );
  };

export const submitApplication =
  (data: ISubmitRequest) => async (dispatch: AppDispatch) => {
    dispatch(submitRequestPending());

    const onSuccess = (): void => {
      toast.success("Submit Application Success!");
      dispatch(submitRequestSuccess());
    };

    const onError = (error: string | undefined): void => {
      dispatch(submitRequestFail(error));
      toast.error(<>{error}</>);
    };

    return put<string>(
      `${appConfig.apiUrl}submit`,
      appConfig.apiTimeoutSeconds,
      data,
      undefined,
      onSuccess,
      onError,
      onError
    );
  };
