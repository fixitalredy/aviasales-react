import { Card } from 'antd';
import React from 'react';

import styles from './TicketFilter.module.scss';

export default function TicketFilter() {
  const filters = [
    {
      name: 'Все',
      cheсked: false,
      id: 1,
    },
    {
      name: 'Без пересадок',
      cheсked: false,
      id: 2,
    },
    {
      name: '1 пересадка',
      cheсked: false,
      id: 3,
    },
    {
      name: '2 пересадки',
      cheсked: false,
      id: 4,
    },
    {
      name: '3 пересадки',
      cheсked: false,
      id: 5,
    },
  ];
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
            <div className={styles.item}>
              <input type="checkbox" id={filter.id} className={styles.input} />
              <label htmlFor={filter.id} className={styles.name}>
                {filter.name}
              </label>
            </div>
          ))}
        </form>
      </Card>
    </div>
  );
}
