/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export const createProduct = createAsyncThunk(
  'products/createProduct',
  async (formData: any, { rejectWithValue }) => {
    try {
      const token: string | null = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token not found in localStorage');
      }
      const user = JSON.parse(token);
      const headers = {
        Authorization: `Bearer ${user?.accessToken}`,
      };
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_PATH}/product/api/create-product`,
        formData,
        { headers },
      );

      if (response.status === 200) {
        return response.data;
      }
      return rejectWithValue('Product addition failed.');
    } catch (error: any) {
      return rejectWithValue(`Failed to create product: ${error.message}`);
    }
  },
);

export const getProductByProductId = createAsyncThunk(
  'product/get-product-by-productId',
  async (productId: any) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_PATH}/product/api/get-product/${productId}`,
      );
      if (response.status === 200) {
        return response.data.data;
      }
    } catch (error) {
      throw new Error('Failed to create product');
    }
  },
);

export const deleteExistingProductTags = createAsyncThunk(
  'product/delete-product-existing-tag',
  async (data: any) => {
    try {
      const token: string | null = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token not found in localStorage');
      }
      const user = JSON.parse(token);
      const headers = {
        Authorization: `Bearer ${user?.accessToken}`,
      };
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_SERVER_PATH}/product/api/delete-product-tag/${user.user.id}/${data.productId}`,
        { tag_id: data.tag_id },
        { headers },
      );
      if (response.status === 200) {
        return 'Product tag deleted successfully.';
      }
    } catch (error) {
      throw new Error('Failed to create product');
    }
  },
);

export const fetchProducts: any = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    try {
      const token: string | null = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token not found in localStorage');
      }
      const user = JSON.parse(token);
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_PATH}/product/api/get-all-products/${user.user.id}`,
      );
      if (response.data.status === 'success') {
        return response.data.data;
      }
      throw new Error('Error occurred while fetching user products');
    } catch (error: any) {
      throw new Error(`Failed to fetch user products: ${error.message}`);
    }
  },
);

export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (productId: any) => {
    try {
      const token: string | null = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token not found in localStorage');
      }
      const user = JSON.parse(token);
      const headers = {
        Authorization: `Bearer ${user.accessToken}`,
      };

      const response: any = await axios.delete(
        `${process.env.NEXT_PUBLIC_SERVER_PATH}/product/api/delete-product/${user.user.id}/${productId}`,
        { headers },
      );

      if (response.status === 422) {
        throw new Error('Error occured while deleting');
      } else if (response.status === 200) {
        return productId;
      }
    } catch (error) {
      throw new Error('Failed while deleting');
    }
  },
);

export const editProduct = createAsyncThunk(
  'products/editProduct',
  async ({ formData, productId }: any, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token not found in localStorage');
      }
      const user = JSON.parse(token);
      const headers = {
        Authorization: `Bearer ${user?.accessToken}`,
      };
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_SERVER_PATH}/product/api/update-product/${user.user.id}/${productId}`,
        formData,
        { headers },
      );

      if (response.status === 200) {
        return response.data;
      }
      return rejectWithValue('Product edit failed.');
    } catch (error: any) {
      return rejectWithValue(`Failed to edit product: ${error.message}`);
    }
  },
);

export const deleteExistingProductImages = createAsyncThunk<any, { data: any }>(
  'product/delete-product-existing-images',
  async (data: any) => {
    try {
      console.log({ productId: data.productId, tag_id: data.poster_id });
      const token: string | null = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token not found in localStorage');
      }
      const user = JSON.parse(token);
      const headers = {
        Authorization: `Bearer ${user?.accessToken}`,
      };
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_SERVER_PATH}/product/api/delete-product-poster/${user.user.id}/${data.productId}`,
        { poster_id: data.poster_id },
        { headers },
      );
      if (response.status === 200) {
        return 'Product poster deleted successfully.';
      }
    } catch (error) {
      throw new Error('Failed to create product');
    }
  },
);

interface ProductsState {
  products: any | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  products: null,
  isLoading: true,
  error: null,
};

export const products = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      // Fetch products
      .addCase(fetchProducts.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.error.message || 'An error occurred while getting products';
      })
      .addCase(createProduct.pending, (state: any) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state: any, action) => {
        state.isLoading = false;
        state.products.push(action.payload.product);
      })
      .addCase(createProduct.rejected, (state: any, action) => {
        state.isLoading = false;
        state.error =
          action.payload || 'An error occurred while creating the product';
      })
      .addCase(deleteProduct.pending, (state: any) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state: any, action) => {
        state.isLoading = false;
        state.products = state.products.filter(
          (product: any) => product._id !== action.payload,
        );
      })
      .addCase(deleteProduct.rejected, (state: any, action) => {
        state.isLoading = false;
        state.error =
          action.payload || 'An error occurred while deleting the product';
      })
      .addCase(editProduct.pending, (state: any) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(editProduct.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
        const indexToUpdate = state.products.findIndex(
          (product: any) => product._id === action.payload.response._id,
        );
        if (indexToUpdate !== -1) {
          state.products[indexToUpdate] = action.payload.response;
        }
      })
      .addCase(editProduct.rejected, (state: any, action: any) => {
        state.isLoading = false;
        state.error =
          action.payload || 'An error occurred while editing the product';
      });
  },
});

export default products.reducer;
