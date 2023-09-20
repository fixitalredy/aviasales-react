/* eslint-disable no-await-in-loop */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { enableMapSet } from 'immer';

enableMapSet();
const initialState = {
  allTickets: [],
  visualTickets: [],
  filteredTickets: [],
  sort: '1',
  filters: ['4', '0', '1', '2', '3'],
  searchId: null,
  status: null,
  error: null,
  ticketsAmount: 5,
};
export const fetchTickets = createAsyncThunk(
  'tickets/fetchTickets',
  // eslint-disable-next-line no-unused-vars, consistent-return
  async (id, { rejectWithValue, dispatch }) => {
    let stop = false;

    while (!stop) {
      try {
        let res = await fetch(
          `https://aviasales-test-api.kata.academy/tickets?searchId=${id}`
        );
        if (!res.ok) {
          throw new Error();
        }
        res = await res.json();
        const ticketsArr = res.tickets;
        stop = res.stop;
        // eslint-disable-next-line no-use-before-define
        dispatch(ticketsActions.addFirstPack(ticketsArr));
      } catch (err) {
        if (!stop) {
          // eslint-disable-next-line no-continue
          continue;
        } else rejectWithValue(err);
      }
    }
  }
);

function calculateOptimalTicket(ticket) {
  return (
    ticket.price + (ticket.segments[0].duration + ticket.segments[1].duration)
  );
}

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
    filterTickets(state) {
      state.filteredTickets = state.allTickets.filter((ticket) =>
        state.filters.includes(
          `${ticket.segments[0].stops.length + ticket.segments[1].stops.length}`
        )
      );
      state.visualTickets = state.filteredTickets.slice(0, 5);
    },
    sortTickets(state) {
      if (state.sort === '1') {
        state.filteredTickets = [...state.filteredTickets].sort(
          (a, b) => a.price - b.price
        );
      }
      if (state.sort === '2') {
        state.filteredTickets = [...state.filteredTickets].sort(
          (a, b) =>
            a.segments[0].duration +
            a.segments[1].duration -
            (b.segments[0].duration + b.segments[1].duration)
        );
      }
      if (state.sort === '3') {
        state.filteredTickets = [...state.filteredTickets].sort(
          (a, b) => calculateOptimalTicket(a) - calculateOptimalTicket(b)
        );
      }
      state.visualTickets = state.filteredTickets.slice(0, 5);
    },
    addFirstPack(state, action) {
      state.allTickets = state.allTickets.concat(action.payload);
    },
  },
  extraReducers: {
    [fetchTickets.pending]: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    [fetchTickets.fulfilled]: (state) => {
      state.status = 'resolved';
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
