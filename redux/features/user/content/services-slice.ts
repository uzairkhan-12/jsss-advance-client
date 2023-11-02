/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export const createService = createAsyncThunk(
  'services/createService',
  async (formData: any) => {
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
        `${process.env.NEXT_PUBLIC_SERVER_PATH}/service/api/create-service`,
        formData,
        { headers },
      );

      if (response.status === 200) {
        return response.data;
      }
      throw new Error('Service Addition failed');
    } catch (error: any) {
      throw new Error('Failed to add service');
    }
  },
);

export const fetchServices: any = createAsyncThunk(
  'services/fetchServices',
  async () => {
    try {
      const token: string | null = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token not found in localStorage');
      }
      const user = JSON.parse(token);
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_PATH}/service/api/get-all-services/${user.user.id}`,
      );
      if (response.data.status === 'success') {
        return response.data.data;
      }
      throw new Error('Error occurred while fetching user services');
    } catch (error: any) {
      throw new Error(`Failed to fetch user services: ${error.message}`);
    }
  },
);

export const deleteService = createAsyncThunk(
  'services/deleteServices',
  async (serviceId: any) => {
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
        `${process.env.NEXT_PUBLIC_SERVER_PATH}/service/api/delete-service/${user.user.id}/${serviceId}`,
        { headers },
      );

      if (response.status === 422) {
        throw new Error('delete service failed');
      } else if (response.status === 200) {
        return serviceId;
      }
    } catch (error) {
      throw new Error('Error while deleting service');
    }
  },
);

export const editService = createAsyncThunk(
  'services/editServices',
  async ({ formData, serviceId }: any, { rejectWithValue }) => {
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
        `${process.env.NEXT_PUBLIC_SERVER_PATH}/service/api/update-service/${user.user.id}/${serviceId}`,
        formData,
        { headers },
      );

      if (response.status === 200) {
        return response.data;
      }
      return rejectWithValue('Service edit failed.');
    } catch (error: any) {
      return rejectWithValue(`Failed to edit Service: ${error.message}`);
    }
  },
);

export const getServiceByServiceId = createAsyncThunk(
  'service/get-service-by-serviceId',
  async (serviceId: any) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_PATH}/service/api/get-service/${serviceId}`,
      );
      if (response.status === 200) {
        return response.data.data;
      }
    } catch (error) {
      throw new Error('Failed to create service');
    }
  },
);

export const deleteExistingServiceTags = createAsyncThunk(
  'service/delete-service-existing-tag',
  async (data: any) => {
    try {
      console.log({ serviceId: data.serviceId, tag_id: data.tag_id });
      const token: string | null = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token not found in localStorage');
      }
      const user = JSON.parse(token);
      const headers = {
        Authorization: `Bearer ${user?.accessToken}`,
      };
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_SERVER_PATH}/service/api/delete-service-tag/${user.user.id}/${data.serviceId}`,
        { tag_id: data.tag_id },
        { headers },
      );
      if (response.status === 200) {
        return 'Service tag deleted successfully.';
      }
    } catch (error) {
      throw new Error('Failed to create product');
    }
  },
);

export const deleteExistingServiceImages = createAsyncThunk(
  'service/delete-service-existing-images',
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
        `${process.env.NEXT_PUBLIC_SERVER_PATH}/service/api/delete-service-poster/${user.user.id}/${data.serviceId}`,
        { poster_id: data.poster_id },
        { headers },
      );
      if (response.status === 200) {
        return 'Service poster deleted successfully.';
      }
    } catch (error) {
      throw new Error('Failed to delete service poster');
    }
  },
);
interface ServiceState {
  services: any | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: ServiceState = {
  services: null,
  isLoading: false,
  error: null,
};

export const services = createSlice({
  name: 'services',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchServices.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchServices.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.services = action.payload;
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.error.message || 'An error occurred while getting services';
      })
      .addCase(createService.pending, (state: any) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createService.fulfilled, (state: any, action) => {
        state.isLoading = false;
        state.services.push(action.payload.service);
      })
      .addCase(createService.rejected, (state: any, action) => {
        state.isLoading = false;
        state.error =
          action.payload || 'An error occurred while creating the service';
      })
      .addCase(deleteService.pending, (state: any) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteService.fulfilled, (state: any, action) => {
        state.isLoading = false;
        state.services = state.services.filter(
          (service: any) => service._id !== action.payload,
        );
      })
      .addCase(deleteService.rejected, (state: any, action) => {
        state.isLoading = false;
        state.error =
          action.payload || 'An error occurred while deleting the service';
      })
      .addCase(editService.pending, (state: any) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(editService.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
        const indexToUpdate = state.services.findIndex(
          (service: any) => service._id === action.payload.response._id,
        );
        if (indexToUpdate !== -1) {
          state.services[indexToUpdate] = action.payload.response;
        }
      })
      .addCase(editService.rejected, (state: any, action: any) => {
        state.isLoading = false;
        state.error =
          action.payload || 'An error occurred while editing the service';
      });
  },
});

export default services.reducer;
