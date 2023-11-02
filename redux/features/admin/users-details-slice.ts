/* eslint-disable @typescript-eslint/no-explicit-any */
import sendRequest from '@/hooks/useAxios';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

export const fetchUsersDetails: any = createAsyncThunk<
  any,
  { company: string }
>('admin/fetchUsersDetails', async () => {
  try {
    const res = await sendRequest(
      'GET',
      `${process.env.NEXT_PUBLIC_SERVER_PATH}/admin/api/get-all-users-detail`,
    );
    if (res.data.status === 'success') {
      return res.data.response;
    }
    throw new Error('Error occurred while fetching user details');
  } catch (error: any) {
    throw new Error(`Failed to fetch user details: ${error.message}`);
  }
});

export const deleteSingleUser: any = createAsyncThunk<any, { user_id: string }>(
  'admin/deleteSingleUser',
  async user_id => {
    try {
      const res = await sendRequest(
        'DELETE',
        `${process.env.NEXT_PUBLIC_SERVER_PATH}/admin/api/delete-user/${user_id}`,
      );
      if (res.data.status === 'success') {
        return res.data.response;
      }
      throw new Error('Error occurred while deleting user');
    } catch (error: any) {
      throw new Error(`Failed to delete user: ${error.message}`);
    }
  },
);

interface usersDetailsState {
  data: any | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: usersDetailsState = {
  data: null,
  isLoading: false,
  error: null,
};

export const usersDetails = createSlice({
  name: 'usersDetails',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchUsersDetails.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchUsersDetails.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.isLoading = false;
          state.data = action.payload;
        },
      )
      .addCase(fetchUsersDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'An error occurred';
      })
      .addCase(deleteSingleUser.pending, (state: any) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteSingleUser.fulfilled, (state: any, action) => {
        state.isLoading = false;
        state.data = state.data.filter(
          (user: any) => user._id !== action.payload,
        );
      })
      .addCase(deleteSingleUser.rejected, (state: any, action) => {
        state.isLoading = false;
        state.error =
          action.payload || 'An error occurred while deleting the user';
      });
  },
});

export default usersDetails.reducer;
