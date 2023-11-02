/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SuccessState {
  message: string | undefined;
}

const initialState: SuccessState = {
  message: undefined,
};

export const successMessage = createSlice({
  name: 'successMessage',
  initialState,
  reducers: {
    logMessage: (state, action: PayloadAction<string>) => {
      state.message = action.payload;
    },
    removeMessage: (state: any) => {
      state.message = undefined;
    },
  },
});

export const { logMessage, removeMessage } = successMessage.actions;
export default successMessage.reducer;
