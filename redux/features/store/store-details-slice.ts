/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

// Define an asynchronous thunk to fetch user info
export const fetchStoreDetails: any = createAsyncThunk<
  any,
  { company: string }
>('storeDetails/fetchStoreDetails', async ({ company }) => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_PATH}/store/api/get-all-for-store/${company}`,
    );
    if (res.data.status === 'success') {
      return res.data.response;
    }
    throw new Error('Error occurred while fetching store details');
  } catch (error: any) {
    throw new Error(`Failed to fetch store details: ${error.message}`);
  }
});

interface storeDetailsState {
  data: any | null;
  isLoading: boolean;
  error: string | null;
  store_theme: string | null;
  company: string | null;
  store_banner: {
    public_id: string;
    url: string;
    type: string;
  } | null;
  products:
    | [
        {
          user_id: string;
          posters: [{ url: string }];
          title: string;
          sub_heading: string;
          desc: string;
          rating: number;
          tags: [{ tag: string }];
          price: number;
          discount: number;
          quantity: number;
          options: string;
          reviews: [
            {
              rating: number;
              comment: string;
            },
          ];
          createdAt: { type: Date };
        },
      ]
    | null;
}

const initialState: storeDetailsState = {
  data: null,
  isLoading: true,
  error: null,
  store_theme: null,
  company: null,
  store_banner: null,
  products: null,
};

export const storeDetails = createSlice({
  name: 'storeDetails',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchStoreDetails.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchStoreDetails.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.isLoading = false;
          state.data = action.payload;
          state.store_theme =
            action.payload.user_details?.[0]?.store_details?.store_theme;
          state.company = action.payload?.company;
          state.store_banner = action.payload?.user_details[0]?.store_banner;
          state.products = action.payload?.products;
        },
      )
      .addCase(fetchStoreDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'An error occurred';
      });
  },
});

export default storeDetails.reducer;
