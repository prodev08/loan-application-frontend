import { FC } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import Loan from "@/components/Loan";
import { useAppDispatch } from "@/utils/hooks";
import { fetchBalanceService, submitApplication } from "./service";
import { IBalanceRequest, ISubmitRequest } from "@/types";

export const LoanContainer: FC = () => {
  const isLoading = useSelector((state: RootState) => state.loan.loading);
  const loan = useSelector((state: RootState) => state.loan.data);

  const dispatch = useAppDispatch();

  const requestFetch = ({
    businessId,
    loanAmount,
    accountName,
  }: IBalanceRequest) => {
    dispatch(
      fetchBalanceService({
        businessId,
        loanAmount,
        accountName,
      })
    );
  };

  const requestSubmit = ({ loanId }: ISubmitRequest) => {
    dispatch(
      submitApplication({
        loanId,
      })
    );
  };

  return (
    <Loan
      isLoading={isLoading}
      loan={loan}
      requestFetch={requestFetch}
      requestSubmit={requestSubmit}
    />
  );
};
