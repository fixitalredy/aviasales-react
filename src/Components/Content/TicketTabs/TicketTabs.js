import React from 'react';
import { ConfigProvider, Tabs } from 'antd';
import { useDispatch } from 'react-redux';

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
  };
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
