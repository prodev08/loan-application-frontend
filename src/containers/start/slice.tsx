import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface IStartState {
  loading: boolean;
  error: string | undefined;
}

const initialState: IStartState = {
  loading: false,
  error: undefined,
};

export const startSlice = createSlice({
  name: "start",
  initialState,
  reducers: {
    startRequestPending: (state) => {
      state.loading = true;
    },
    startRequestSuccess: (state) => {
      state.loading = false;
    },
    startRequestFail: (state, action: PayloadAction<string | undefined>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { startRequestPending, startRequestSuccess, startRequestFail } =
  startSlice.actions;

export default startSlice.reducer;
