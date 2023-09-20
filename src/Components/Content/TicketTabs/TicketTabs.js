import React, { useEffect } from 'react';
import { ConfigProvider, Tabs } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { ticketsActions } from '../../../store/ticketsSlice';
import TicketList from '../TicketList/TicketList';
import './TicketTabs.scss';

const items = [
  {
    key: '1',
    label: 'САМЫЙ ДЕШЕВЫЙ',
    children: <TicketList />,
  },
  {
    key: '2',
    label: 'САМЫЙ БЫСТРЫЙ',
    children: <TicketList />,
  },
  {
    key: '3',
    label: 'ОПТИМАЛЬНЫЙ',
    children: <TicketList />,
  },
];

export default function TicketTabs() {
  const dispatchFn = useDispatch();
  const selectorFilteredTickets = (state) => state.filteredTickets;
  const filteredTickets = useSelector(selectorFilteredTickets);
  const changeSortHandler = (key) => {
    if (key === '1') {
      dispatchFn(ticketsActions.sortCheap());
    }
    if (key === '2') {
      dispatchFn(ticketsActions.sortFast());
    }
    if (key === '3') {
      dispatchFn(ticketsActions.sortOptimal());
    }
    dispatchFn(ticketsActions.sortTickets());
  };
  useEffect(() => {
    if (filteredTickets.length !== 0) {
      dispatchFn(ticketsActions.sortTickets());
    }
  }, [dispatchFn, filteredTickets.length]);
  return (
    <ConfigProvider
      theme={{
        components: {
          Tabs: {
            inkBarColor: 'none',
            itemSelectedColor: '#fff',
            itemActiveColor: '#fff',
            horizontalItemGutter: '0px',
          },
        },
      }}
    >
      <Tabs defaultActiveKey="1" items={items} onChange={changeSortHandler} />
    </ConfigProvider>
  );
}
