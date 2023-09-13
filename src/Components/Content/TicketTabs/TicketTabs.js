import React from 'react';
import { ConfigProvider, Tabs } from 'antd';

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
      <Tabs defaultActiveKey="1" items={items} />
    </ConfigProvider>
  );
}
