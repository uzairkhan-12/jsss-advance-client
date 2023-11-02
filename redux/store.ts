import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import userDetailsReducer from './features/user/user-details-slice';
import storeDetailsReducer from './features/store/store-details-slice';
import productsReducer from './features/user/content/products-slice';
import servicesReducer from './features/user/content/services-slice';
import adminUsersDetailsReducer from './features/admin/users-details-slice';
import successMessageReducer from './features/notifications/success-slice';
import userPostReducer from './features/user/user-posts-slice';
import authDetailsReducer from './features/auth/auth-slice';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const reducers = combineReducers({
  userDetailsReducer,
  userPostReducer,
  storeDetailsReducer,
  productsReducer,
  servicesReducer,
  adminUsersDetailsReducer,
  successMessageReducer,
  authDetailsReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['authDetailsReducer'],
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
