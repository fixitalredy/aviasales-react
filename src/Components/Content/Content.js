import React from 'react';
import { Row, Col } from 'antd';

import styles from './Content.module.scss';
import TicketTabs from './TicketTabs/TicketTabs';
import TicketFilter from './TicketFilter/TicketFilter';

export default function Content() {
  return (
    <main className="Content">
      <Row className={styles.row}>
        <Col lg={8} className={styles.colleft}>
          <TicketFilter />
        </Col>
        <Col lg={16} className={styles.colright}>
          <TicketTabs />
        </Col>
      </Row>
    </main>
  );
}
