/* eslint-disable default-param-last */

import { createSlice, configureStore } from '@reduxjs/toolkit';
import { enableMapSet } from 'immer';

enableMapSet();

const initialState = {
  sort: '1',
  filters: [],
};

const ticketsSlice = createSlice({
  name: 'tickets',
  initialState,
  reducers: {
    sortCheap(state) {
      state.sort = '1';
    },
    sortFast(state) {
      state.sort = '2';
    },
    sortOptimal(state) {
      state.sort = '3';
    },
    addFilter(state, action) {
      const set = new Set([...state.filters, ...action.payload]);
      const values = set.values();
      state.filters = Array.from(values);
    },
    removeFilter(state, action) {
      state.filters = state.filters.filter(
        (item) => !action.payload.includes(item)
      );
    },
  },
});

const store = configureStore({
  reducer: ticketsSlice.reducer,
});

export const ticketsActions = ticketsSlice.actions;

export default store;
