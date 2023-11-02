/* eslint-disable @typescript-eslint/no-explicit-any */
import sendRequest from '@/hooks/useAxios';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
export const fetchUserPosts: any = createAsyncThunk<any>(
  'posts/get-user-posts',
  async (userId: any) => {
    try {
      const res = await sendRequest(
        'GET',
        `${process.env.NEXT_PUBLIC_SERVER_PATH}/post/api/get-all-posts/${userId}`,
      );
      if (res.status === 200) {
        return res.data.data;
      }
      throw new Error('Error occurred while fetching user posts', res);
    } catch (err: any) {
      throw new Error('Error occurred while fetching user posts', err);
    }
  },
);

export const createPost: any = createAsyncThunk<any>(
  'posts/create-post',
  async (data: any) => {
    try {
      const res = await sendRequest(
        'POST',
        `${process.env.NEXT_PUBLIC_SERVER_PATH}/post/api/create-post`,
        data,
      );
      if (res.status === 201) {
        return res.data.data;
      }
      throw new Error('post creation failed.');
    } catch (err: any) {
      throw new Error('Error occurred while creating the post');
    }
  },
);

export const getPostByPostId = createAsyncThunk(
  'post/get-post-by-postId',
  async (postId: any) => {
    try {
      const res = await sendRequest(
        'GET',
        `${process.env.NEXT_PUBLIC_SERVER_PATH}/post/api/get-post/${postId}`,
      );
      if (res.status === 200) {
        return res.data.data;
      }
    } catch (error) {
      throw new Error('Failed to create product');
    }
  },
);

export const editPost = createAsyncThunk(
  'post/editPost',
  async ({ data, postId }: any) => {
    try {
      const res = await sendRequest(
        'PATCH',
        `${process.env.NEXT_PUBLIC_SERVER_PATH}/post/api/edit-post/${data.user_id}/${postId}`,
        data,
      );
      if (res.status === 200) {
        return res.data.response;
      }
      throw new Error('Product edit failed.');
    } catch (error: any) {
      throw new Error(`Failed to edit product: ${error.message}`);
    }
  },
);

export const deletePost = createAsyncThunk(
  'post/deletePost',
  async (data: any) => {
    try {
      const res = await sendRequest(
        'DELETE',
        `${process.env.NEXT_PUBLIC_SERVER_PATH}/post/api/delete-post/${data.userId}/${data.postId}`,
      );

      if (res.status === 422) {
        throw new Error('delete post failed');
      } else if (res.status === 200) {
        return data.postId;
      }
    } catch (error) {
      throw new Error('Error while deleting post');
    }
  },
);

interface postState {
  posts: any | null;
  post: any | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: postState = {
  posts: null,
  post: null,
  isLoading: false,
  error: null,
};

export const userPosts = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchUserPosts.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchUserPosts.fulfilled,
        (state: any, action: PayloadAction<any>) => {
          state.isLoading = false;
          state.posts = action.payload;
        },
      )
      .addCase(fetchUserPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.error.message || 'An error occurred while getting posts';
      })
      .addCase(createPost.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        createPost.fulfilled,
        (state: any, action: PayloadAction<any>) => {
          state.isLoading = false;
          state.posts.push(action.payload);
        },
      )
      .addCase(createPost.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.error.message || 'An error occurred while getting posts';
      })
      .addCase(editPost.pending, (state: any) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(editPost.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
        const indexToUpdate = state.posts.findIndex(
          (post: any) => post._id === action.payload._id,
        );
        if (indexToUpdate !== -1) {
          state.posts[indexToUpdate] = action.payload;
        }
      })
      .addCase(editPost.rejected, (state: any, action: any) => {
        state.isLoading = false;
        state.error =
          action.payload || 'An error occurred while editing the post';
      })
      .addCase(deletePost.pending, (state: any) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deletePost.fulfilled, (state: any, action) => {
        state.isLoading = false;
        state.posts = state.posts.filter(
          (post: any) => post._id !== action.payload,
        );
      })
      .addCase(deletePost.rejected, (state: any, action) => {
        state.isLoading = false;
        state.error =
          action.payload || 'An error occurred while deleting the post';
      })
      .addCase(getPostByPostId.pending, (state: any) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getPostByPostId.fulfilled, (state: any, action) => {
        state.isLoading = false;
        state.post = action.payload;
      })
      .addCase(getPostByPostId.rejected, (state: any, action) => {
        state.isLoading = false;
        state.error =
          action.payload || 'An error occurred while deleting the post';
      });
  },
});

export default userPosts.reducer;
