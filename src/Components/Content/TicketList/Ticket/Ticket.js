import React from 'react';
import { Card, Row, Col } from 'antd';

import styles from './Ticket.module.scss';

export default function Ticket() {
  return (
    <li className={styles.container}>
      <Card
        className={styles.content}
        bodyStyle={{ padding: '22px', fontFamily: 'open-sans' }}
      >
        <Row className={styles.row}>
          <Col className={styles.col} lg={18}>
            13400 P
          </Col>
          <Col className={styles.col} lg={6}>
            LOGOTIP
          </Col>
        </Row>
        <Row className={styles.row}>
          <Col className={styles.col} lg={8}>
            <Row className={styles.subrow}>MOW-HKT</Row>
            <Row className={styles.subrow}>10:45 - 08:00</Row>
          </Col>
          <Col className={styles.col} lg={8}>
            <Row className={styles.subrow}>В ПУТИ</Row>
            <Row className={styles.subrow}>21ч 15м</Row>
          </Col>
          <Col className={styles.col} lg={8}>
            <Row className={styles.subrow}>2 ПЕРЕСАДКИ</Row>
            <Row className={styles.subrow}>MOW-HKT</Row>
          </Col>
        </Row>
        <Row className={styles.row}>
          <Col className={styles.col} lg={8}>
            <Row className={styles.subrow}>MOW-HKT</Row>
            <Row className={styles.subrow}>10:45 - 08:00</Row>
          </Col>
          <Col className={styles.col} lg={8}>
            <Row className={styles.subrow}>В ПУТИ</Row>
            <Row className={styles.subrow}>21ч 15м</Row>
          </Col>
          <Col className={styles.col} lg={8}>
            <Row className={styles.subrow}>2 ПЕРЕСАДКИ</Row>
            <Row className={styles.subrow}>MOW-HKT</Row>
          </Col>
        </Row>
      </Card>
    </li>
  );
}
