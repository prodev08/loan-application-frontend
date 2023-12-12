import { NavigateFunction } from "react-router-dom";
import toast from "react-hot-toast";
import { get } from "@/utils/api";
import { appConfig } from "@/config";
import {
  startRequestPending,
  startRequestSuccess,
  startRequestFail,
} from "./slice";
import { AppDispatch } from "@/store";

export const startService =
  (navigate: NavigateFunction) => async (dispatch: AppDispatch) => {
    dispatch(startRequestPending());

    const onSuccess = (): void => {
      dispatch(startRequestSuccess());
      toast.success("Initiate Complete");
      navigate(`${appConfig.rootPath}loan`);
    };

    const onError = (error: string | undefined): void => {
      dispatch(startRequestFail(error));
      toast.error(<>{error}</>);
    };

    return get<string>(
      `${appConfig.apiUrl}initiate`,
      appConfig.apiTimeoutSeconds,
      undefined,
      onSuccess,
      onError,
      onError
    );
  };
