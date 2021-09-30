import { configureStore } from '@reduxjs/toolkit';

import { cryptoApi } from '../services/cryptoApi';
import { cryptoApi2 } from '../services/cryptoApi2';


export default configureStore({
  reducer: {
    [cryptoApi.reducerPath]: cryptoApi.reducer,
    [cryptoApi2.reducerPath]: cryptoApi2.reducer
  },
});