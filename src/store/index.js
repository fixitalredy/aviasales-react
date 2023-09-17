/* eslint-disable default-param-last */

import { configureStore } from '@reduxjs/toolkit';

import { ticketsSlice } from './ticketsSlice';

const store = configureStore({
  reducer: ticketsSlice.reducer,
});

export default store;
