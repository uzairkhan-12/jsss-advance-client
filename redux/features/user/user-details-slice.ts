/* eslint-disable @typescript-eslint/no-explicit-any */
import sendRequest from '@/hooks/useAxios';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

// Define an asynchronous thunk to fetch user info
export const fetchUserDetails: any = createAsyncThunk(
  'userDetails/fetchUserDetails',
  async () => {
    try {
      const token: string | null = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token not found in localStorage');
      }
      const user = JSON.parse(token);

      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_PATH}/user-details/api/get-user-details/${user.user.id}`,
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        },
      );
      if (res.data.status === 'success') {
        return res.data.response;
      }
      throw new Error('Error occurred while fetching user details');
    } catch (error: any) {
      throw new Error(`Failed to fetch user details: ${error.message}`);
    }
  },
);

export const updateStoreTheme: any = createAsyncThunk<
  any,
  { store_theme: string }
>('userDetails/updateStoreTheme', async store_theme => {
  try {
    const token: string | null = localStorage.getItem('token');
    if (!token) {
      throw new Error('Token not found in localStorage');
    }
    const user = JSON.parse(token);

    const requestData = {
      store_theme,
    };

    const res = await sendRequest(
      'PATCH',
      `${process.env.NEXT_PUBLIC_SERVER_PATH}/user-details/api/update-store-theme/${user.user.id}`,
      requestData,
    );
    if (res.data.status === 'success') {
      return res.data.response;
    }
    throw new Error('Error occurred while fetching user details');
  } catch (error: any) {
    throw new Error(`Failed to fetch user details: ${error.message}`);
  }
});

interface UserDetailsState {
  name: string | null;
  email: string | null;
  company: string | null;
  user: any | null;
  isLoading: boolean;
  error: string | null;
  isLoadingStoreTheme: boolean;
}

const initialState: UserDetailsState = {
  name: null,
  email: null,
  company: null,
  user: null,
  isLoading: true,
  isLoadingStoreTheme: false,
  error: null,
};

export const userDetails = createSlice({
  name: 'userDetails',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchUserDetails.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchUserDetails.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.isLoading = false;
          state.user = action.payload;
          state.name = action.payload.name;
          state.email = action.payload.email;
          state.company = action.payload.company;
        },
      )
      .addCase(fetchUserDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'An error occurred';
      })
      .addCase(updateStoreTheme.pending, (state: any) => {
        state.isLoadingStoreTheme = true;
        state.error = null;
      })
      .addCase(updateStoreTheme.fulfilled, (state: any) => {
        state.isLoadingStoreTheme = false;
      })
      .addCase(updateStoreTheme.rejected, (state: any, action) => {
        state.isLoadingStoreTheme = false;
        state.error =
          action.payload || 'An error occurred while deleting the user';
      });
  },
});

export default userDetails.reducer;
