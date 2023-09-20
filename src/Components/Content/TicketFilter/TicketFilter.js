/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import { Card, Spin } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ticketsActions } from '../../../store/ticketsSlice';

import styles from './TicketFilter.module.scss';

export default function TicketFilter() {
  const filters = [
    {
      name: 'Все',
      id: '4',
    },
    {
      name: 'Без пересадок',
      id: '0',
    },
    {
      name: '1 пересадка',
      id: '1',
    },
    {
      name: '2 пересадки',
      id: '2',
    },
    {
      name: '3 пересадки',
      id: '3',
    },
  ];

  const dispatch = useDispatch();
  const selector = (state) => state.filters;
  const allFilters = useSelector(selector);
  const selectorTickets = (state) => state.allTickets;
  const allTickets = useSelector(selectorTickets);
  const selectorStatus = (state) => state.status;
  const status = useSelector(selectorStatus);

  const changeFilters = (e) => {
    const { id, checked } = e.target;
    if (checked && id !== '4') {
      dispatch(ticketsActions.addFilter([id]));
    }
    if (checked && allFilters.length > 2) {
      dispatch(ticketsActions.addFilter([id, '4']));
    }
    if (checked && id === '4') {
      dispatch(ticketsActions.addFilter(['4', '0', '1', '2', '3']));
    }
    if (!checked && id === '4') {
      dispatch(ticketsActions.removeFilter(['4', '0', '1', '2', '3']));
    }
    if (!checked && id !== '4') {
      dispatch(ticketsActions.removeFilter(['4', id]));
    }
    dispatch(ticketsActions.filterTickets());
  };

  useEffect(() => {
    if (allTickets.length === 500 || status === 'resolved') {
      dispatch(ticketsActions.filterTickets());
    }
  }, [dispatch, allTickets, status]);

  return (
    <div className={styles.container}>
      <Card
        className={styles.content}
        bodyStyle={{
          padding: '0',
          fontFamily: 'open-sans',
        }}
      >
        <h1 className={styles.header}>КОЛИЧЕСТВО ПЕРЕСАДОК</h1>
        <form className={styles.form}>
          {filters.map((filter) => (
            <div className={styles.item} key={filter.id}>
              <input
                type="checkbox"
                id={filter.id}
                className={styles.input}
                onChange={changeFilters}
                checked={allFilters.includes(filter.id)}
                readOnly
              />
              <label htmlFor={filter.id} className={styles.name}>
                {filter.name}
              </label>
            </div>
          ))}
        </form>
      </Card>
      {status === 'loading' ? (
        <Spin style={{ marginTop: '20px' }} size="large" />
      ) : null}
    </div>
  );
}
