import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { enableMapSet } from 'immer';

enableMapSet();
const initialState = {
  allTickets: [],
  visualTickets: [],
  filteredTickets: [],
  sort: '1',
  filters: [3],
  searchId: null,
  status: null,
  error: null,
  ticketsAmount: 5,
};
export const fetchTickets = createAsyncThunk(
  'tickets/fetchTickets',
  // eslint-disable-next-line no-unused-vars
  async (id, { rejectWithValue }) => {
    try {
      let res = await fetch(
        `https://aviasales-test-api.kata.academy/tickets?searchId=${id}`
      );
      if (!res.ok) {
        throw new Error();
      }
      res = await res.json();
      const result = res.tickets;
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
      state.visualTickets = state.filteredTickets.slice(0, state.ticketsAmount);
    },
  },
  extraReducers: {
    [fetchTickets.pending]: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    [fetchTickets.fulfilled]: (state, action) => {
      state.status = 'resolved';
      state.allTickets = action.payload;
      state.filteredTickets = state.allTickets.filter((ticket) =>
        state.filters.includes(
          ticket.segments[0].stops.length + ticket.segments[1].stops.length
        )
      );
      state.visualTickets = state.filteredTickets.slice(0, 5);
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
