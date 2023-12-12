import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IBalanceResponse } from "@/types";

export interface ILoanState {
  loading: boolean;
  data: IBalanceResponse | null;
  error: string | undefined;
}

const initialState: ILoanState = {
  loading: false,
  data: null,
  error: undefined,
};

export const loanSlice = createSlice({
  name: "loan",
  initialState,
  reducers: {
    loanRequestPending: (state) => {
      state.data = null;
      state.loading = true;
    },
    loanRequestSuccess: (state, data: PayloadAction<IBalanceResponse>) => {
      state.data = data.payload;
      state.loading = false;
    },
    loanRequestFail: (state, action: PayloadAction<string | undefined>) => {
      state.loading = false;
      state.data = null;
      state.error = action.payload;
    },
    submitRequestPending: (state) => {
      state.loading = true;
    },
    submitRequestSuccess: (state) => {
      state.data = null;
      state.loading = false;
    },
    submitRequestFail: (state, action: PayloadAction<string | undefined>) => {
      state.loading = false;
      state.data = null;
      state.error = action.payload;
    },
  },
});

export const {
  loanRequestPending,
  loanRequestSuccess,
  loanRequestFail,
  submitRequestPending,
  submitRequestSuccess,
  submitRequestFail,
} = loanSlice.actions;

export default loanSlice.reducer;
