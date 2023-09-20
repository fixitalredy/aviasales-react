import React, { useState, useEffect } from 'react';
import { Row, Col } from 'antd';

import styles from './Content.module.scss';
import TicketTabs from './TicketTabs/TicketTabs';
import TicketFilter from './TicketFilter/TicketFilter';

export default function Content() {
  const [buttonStyle, setButtonStyle] = useState({});

  const handleScroll = () => {
    const scroll = window.scrollY;
    const newButtonStyle = {
      display: scroll > 200 ? 'block' : 'none',
    };
    setButtonStyle(newButtonStyle);
  };
  const handleTop = () => {
    window.scrollTo(0, 0);
  };
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <main className={styles.content}>
      <Row className={styles.row}>
        <Col lg={8} md={8} sm={0} xs={0} className={styles.colleft}>
          <TicketFilter />
        </Col>
        <Col lg={16} md={16} sm={24} xs={24} className={styles.colright}>
          <TicketTabs />
        </Col>

        <button
          className={styles.onTop}
          type="button"
          id="myBtn"
          style={buttonStyle}
          onClick={handleTop}
          onScroll={handleScroll}
        >
          go to top
        </button>
      </Row>
    </main>
  );
}
