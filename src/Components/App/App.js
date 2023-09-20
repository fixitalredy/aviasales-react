import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Content from '../Content/Content';
import { fetchTickets, ticketsActions } from '../../store/ticketsSlice';

import logo from './Logo.png';
import './App.scss';

function App() {
  const dispatch = useDispatch();
  const selectorId = (state) => state.searchId;
  const searchId = useSelector(selectorId);
  useEffect(() => {
    const fetchData = async () => {
      let res = await fetch('https://aviasales-test-api.kata.academy/search');
      res = await res.json();
      const id = res.searchId;
      dispatch(ticketsActions.setId(id));
    };
    fetchData();
  }, [dispatch]);
  useEffect(() => {
    if (searchId) {
      dispatch(fetchTickets(searchId));
    }
  }, [dispatch, searchId]);

  return (
    <div className="App">
      <div className="Wrapper">
        <img src={logo} width={60} height={60} alt="logo" />
        <Content />
      </div>
    </div>
  );
}

export default App;
