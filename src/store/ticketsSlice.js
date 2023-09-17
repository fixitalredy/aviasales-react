import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { enableMapSet } from 'immer';

enableMapSet();

const initialState = {
  tickets: [],
  sort: '1',
  filters: [],
  searchId: null,
  status: null,
  error: null,
  ticketsAmount: 5,
};
export const fetchTickets = createAsyncThunk(
  'tickets/fetchTickets',
  // eslint-disable-next-line no-unused-vars
  async (id, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      console.log(state);
      let res = await fetch(
        `https://aviasales-test-api.kata.academy/tickets?searchId=${id}`
      );
      if (!res.ok) {
        throw new Error();
      }
      res = await res.json();
      const result = res.tickets.slice(0, state.ticketsAmount);
      return result;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const ticketsSlice = createSlice({
  name: 'tickets',
  initialState,
  reducers: {
    setId(state, action) {
      state.searchId = action.payload;
    },
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
    getMoreTickets(state) {
      state.ticketsAmount += 5;
    },
  },
  extraReducers: {
    [fetchTickets.pending]: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    [fetchTickets.fulfilled]: (state, action) => {
      state.status = 'resolved';
      state.tickets = action.payload;
    },
    [fetchTickets.rejected]: (state, action) => {
      state.error = action.payload;
      state.status = 'rejected';
    },
  },
});

// eslint-disable-next-line import/prefer-default-export
export const ticketsActions = ticketsSlice.actions;
export { ticketsSlice };
