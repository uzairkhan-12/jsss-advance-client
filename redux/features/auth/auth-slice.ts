/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  uid: string | undefined;
  name: string | undefined;
  email: string | undefined;
  role: string | undefined;
}

const initialState: AuthState = {
  uid: undefined,
  name: undefined,
  email: undefined,
  role: undefined,
};

export const authDetails = createSlice({
  name: 'authDetails',
  initialState,
  reducers: {
    setAuthUser: (
      state,
      action: PayloadAction<{
        uid: string;
        name: string;
        email: string;
        role: string;
      }>,
    ) => {
      state.uid = action.payload.uid;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.role = action.payload.role;
    },
    removeAutUser: (state: any) => {
      state.uid = initialState.uid;
      state.name = initialState.name;
      state.email = initialState.email;
      state.role = initialState.role;
    },
  },
});

export const { setAuthUser, removeAutUser } = authDetails.actions;
export default authDetails.reducer;
